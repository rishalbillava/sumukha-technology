import { MachineGeometry } from './machine-geometry.js';
export function createViewer(canvas, onUnavailable = () => {}) {
 let gl;
 try { gl = canvas.getContext('webgl', { antialias: true, alpha: false }); } catch {}
 if (!gl) { onUnavailable(); return null; }
 try {
 const vertex=`attribute vec3 aPosition;attribute vec3 aNormal;attribute vec3 aColor;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;varying vec3 vNormal;varying vec3 vPosition;varying vec3 vColor;void main(){vec4 p=uModel*vec4(aPosition,1.0);vPosition=p.xyz;vNormal=mat3(uModel)*aNormal;vColor=aColor;gl_Position=uProjection*uView*p;}`;
 const fragment=`precision mediump float;varying vec3 vNormal;varying vec3 vPosition;varying vec3 vColor;uniform vec3 uEye;void main(){vec3 n=normalize(vNormal);vec3 l=normalize(vec3(-3.0,5.0,4.0));float d=max(dot(n,l),0.0);vec3 h=normalize(l+normalize(uEye-vPosition));float s=pow(max(dot(n,h),0.0),42.0);float rim=pow(1.0-max(dot(n,normalize(uEye-vPosition)),0.0),3.0);vec3 c=vColor*(0.38+d*0.72)+vec3(0.45,0.68,0.86)*s*0.42+vec3(0.09,0.22,0.30)*rim;gl_FragColor=vec4(c,1.0);}`;
 function shader(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error('Shader failed');return sh;}
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader linking failed');gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);for(const [name,offset] of [['aPosition',0],['aNormal',12],['aColor',24]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,36,offset);}const uniforms={};for(const n of ['uModel','uView','uProjection','uEye'])uniforms[n]=gl.getUniformLocation(program,n);
 gl.enable(gl.DEPTH_TEST);gl.clearColor(.035,.073,.135,1);let vertices=0,mode=0,yaw=-.46,pitch=.08,distance=6,drag=null,queued=false,lost=false,active=true,frame=0;
 function multiply(a,b){const out=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let sum=0;for(let i=0;i<4;i++)sum+=a[i*4+r]*b[c*4+i];out[c*4+r]=sum;}return out;}
 function perspective(aspect){const f=1/Math.tan(Math.PI/8),near=.1,far=60;return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]);}
 function norm(v){const l=Math.hypot(...v);return v.map(x=>x/l);}function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
 function lookAt(eye){const z=norm(eye),x=norm(cross([0,1,0],z)),y=cross(z,x),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);}
 function model(){const c=Math.cos(yaw),s=Math.sin(yaw),a=Math.cos(pitch),b=Math.sin(pitch);const Y=[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1],X=[1,0,0,0,0,a,b,0,0,-b,a,0,0,0,0,1],T=[1,0,0,0,0,1,0,0,0,0,1,0,0,-1.05,0,1];return multiply(multiply(Y,X),T);}
 function draw(){queued=false;if(lost||!active)return;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;const ratio=Math.min(devicePixelRatio||1,1.75),w=Math.round(rect.width*ratio),h=Math.round(rect.height*ratio);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const eye=[0,1.65,distance];gl.uniformMatrix4fv(uniforms.uModel,false,model());gl.uniformMatrix4fv(uniforms.uView,false,lookAt(eye));gl.uniformMatrix4fv(uniforms.uProjection,false,perspective(w/h));gl.uniform3fv(uniforms.uEye,eye);gl.drawArrays(gl.TRIANGLES,0,vertices);}
 function requestDraw(){if(!queued){queued=true;frame=requestAnimationFrame(draw);}}
 function load(index){mode=index;const mesh=MachineGeometry.build(index);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);vertices=mesh.length/9;yaw=-.46;pitch=.08;distance=6;requestDraw();}
 function adjust(action){if(action==='left')yaw-=.3;if(action==='right')yaw+=.3;if(action==='up')pitch=Math.min(.7,pitch+.15);if(action==='down')pitch=Math.max(-.35,pitch-.15);if(action==='in')distance=Math.max(4.3,distance-.45);if(action==='out')distance=Math.min(8.5,distance+.45);if(action==='reset'){yaw=-.46;pitch=.08;distance=6;}requestDraw();}

 const listeners=[];
 function listen(target,type,handler){target.addEventListener(type,handler);listeners.push(()=>target.removeEventListener(type,handler));}
 listen(canvas,'pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
 listen(canvas,'pointermove',e=>{if(!drag)return;yaw+=(e.clientX-drag.x)*.012;pitch=Math.max(-.35,Math.min(.7,pitch+(e.clientY-drag.y)*.008));drag.x=e.clientX;drag.y=e.clientY;requestDraw();});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])listen(canvas,type,()=>{drag=null;canvas.classList.remove('dragging')});
 listen(canvas,'keydown',e=>{const keys={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','=':'in','-':'out',Home:'reset'};if(keys[e.key]){e.preventDefault();adjust(keys[e.key]);}});
 listen(canvas,'webglcontextlost',e=>{e.preventDefault();lost=true;onUnavailable();});
 const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(requestDraw);
 if(observer)observer.observe(canvas);else listen(window,'resize',requestDraw);
 load(0);
 return {setMode:load,adjust,resize:requestDraw,setActive(value){active=value;requestDraw()},dispose(){active=false;lost=true;cancelAnimationFrame(frame);observer?.disconnect();listeners.forEach(remove=>remove());gl.deleteBuffer(buffer);for(const shader of gl.getAttachedShaders(program)||[])gl.deleteShader(shader);gl.deleteProgram(program);}};
 } catch { onUnavailable();return null; }
}
