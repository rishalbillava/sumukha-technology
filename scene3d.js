/* Lightweight native WebGL mesh data. Illustrative product shapes. */
const MachineGeometry=(()=>{
 function build(mode=0){
  const data=[],dark=[.10,.14,.19],silver=[.66,.72,.78],black=[.035,.045,.06],blue=[.02,.46,.8],light=[.76,.83,.9],paper=[.66,.7,.56];
  function triangle(a,b,c,color,n){if(!n){const u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const l=Math.hypot(...n)||1;n=n.map(v=>v/l);}for(const p of [a,b,c])data.push(...p,...n,...color);}
  function quad(a,b,c,d,col,n){triangle(a,b,c,col,n);triangle(a,c,d,col,n);}
  function box(x,y,z,w,h,d,col){const X=[x-w/2,x+w/2],Y=[y-h/2,y+h/2],Z=[z-d/2,z+d/2];quad([X[0],Y[0],Z[1]],[X[1],Y[0],Z[1]],[X[1],Y[1],Z[1]],[X[0],Y[1],Z[1]],col,[0,0,1]);quad([X[1],Y[0],Z[0]],[X[0],Y[0],Z[0]],[X[0],Y[1],Z[0]],[X[1],Y[1],Z[0]],col,[0,0,-1]);quad([X[1],Y[0],Z[1]],[X[1],Y[0],Z[0]],[X[1],Y[1],Z[0]],[X[1],Y[1],Z[1]],col,[1,0,0]);quad([X[0],Y[0],Z[0]],[X[0],Y[0],Z[1]],[X[0],Y[1],Z[1]],[X[0],Y[1],Z[0]],col,[-1,0,0]);quad([X[0],Y[1],Z[1]],[X[1],Y[1],Z[1]],[X[1],Y[1],Z[0]],[X[0],Y[1],Z[0]],col,[0,1,0]);quad([X[0],Y[0],Z[0]],[X[1],Y[0],Z[0]],[X[1],Y[0],Z[1]],[X[0],Y[0],Z[1]],col,[0,-1,0]);}
  function roller(x,y,z,length,r){for(let i=0;i<32;i++){const a=i*Math.PI/16,b=(i+1)*Math.PI/16;quad([x-length/2,y+Math.cos(a)*r,z+Math.sin(a)*r],[x+length/2,y+Math.cos(a)*r,z+Math.sin(a)*r],[x+length/2,y+Math.cos(b)*r,z+Math.sin(b)*r],[x-length/2,y+Math.cos(b)*r,z+Math.sin(b)*r],i%3===0?silver:black,[0,Math.cos((a+b)/2),Math.sin((a+b)/2)]);}}
  function panel(x,y,z,w,h,col){box(x,y,z,w,h,.055,col);}
  function body(width){const section=[[.2,-.65],[.2,.65],[.83,.68],[1.61,.26],[1.72,-.50]];for(let side of [-1,1]){const pts=section.map(([y,z])=>[side*width/2,y,z]);for(let i=1;i<pts.length-1;i++)triangle(pts[0],pts[i],pts[i+1],silver,[side,0,0]);}for(let i=0;i<section.length;i++){const [y,z]=section[i],[Y,Z]=section[(i+1)%section.length];quad([-width/2,y,z],[width/2,y,z],[width/2,Y,Z],[-width/2,Y,Z],dark);}}
  // Platform and rubber feet anchor the machine in three-dimensional space.
  box(0,.04,0,3.25,.06,2.25,[.10,.19,.29]);for(let x of [-.8,.8])for(let z of [-.5,.5])box(x,.15,z,.18,.14,.22,black);
  if(mode===2){
   box(0,.32,.15,2,.27,1.65,dark);box(0,.45,.44,1.65,.04,.8,black);box(0,1.1,-.36,1.94,1.25,.28,dark);panel(-.22,1.32,-.197,1.11,.63,black);panel(-.22,1.32,-.16,1.01,.53,blue);for(let i=0;i<4;i++)panel(.62,1.54-i*.2,-.19,.24,.11,silver);box(0,.8,-.2,1.5,.07,.14,[.13,.26,.97]);for(let i=0;i<4;i++)box(-.05,.51+i*.006,.38,1.25,.005,.56,paper);
  }else{
   body(mode===1?2.35:2.02);const w=mode===1?2.35:2.02;
   box(-w/2+.1,1.18,.06,.12,.78,.85,light);box(w/2-.1,1.18,.06,.12,.78,.85,light);
   box(0,1.74,-.23,w-.25,.1,.66,black);box(-.58,2,-.37,.13,.57,.2,dark);box(.58,2,-.37,.13,.57,.2,dark);box(0,1.86,-.39,1.15,.12,.27,black);
   for(let i=0;i<12;i++)box(0,1.85+i*.012,-.06,.97,.009,.49,paper);
   panel(-.27,1.29,.472,.76,.37,black);panel(-.27,1.29,.508,.67,.28,blue);for(let i=0;i<3;i++)for(let j=0;j<2;j++)panel(.4+j*.23,1.43-i*.15,.49,.14,.09,i===2&&j===1?blue:silver);
   // Counted note pocket, feed rollers and output trays.
   box(0,.49,.83,w-.23,.12,.68,black);box(0,.69,.6,w-.35,.38,.18,black);for(let x of [-.56,0,.56])roller(x,.71,.69,.28,.12);
   if(mode===1){const cols=[[.46,.56,.41],[.73,.53,.24],[.56,.43,.66],[.72,.4,.53],[.27,.56,.65]];for(let i=0;i<5;i++){const x=(i-2)*.41;box(x,.5,1.03,.39,.12,.7,dark);for(let n=0;n<7;n++)box(x,.6+n*.012,1.03,.32,.009,.5,cols[i]);box(x,.62,1.37,.35,.17,.055,cols[i]);}}
   else{for(let i=0;i<10;i++)box(0,.56+i*.012,.94,.97,.009,.54,paper);box(-.64,.61,1.11,.13,.3,.28,dark);box(.64,.61,1.11,.13,.3,.28,dark);}
   for(let i=0;i<7;i++)box(w/2+.002,.74+i*.06,-.12,.015,.015,.32,black);
  }
  return new Float32Array(data);
 }
 return {build};
})();
if(typeof module!=='undefined')module.exports=MachineGeometry;
