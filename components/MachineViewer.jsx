'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createViewer } from '../lib/create-viewer';
export default function MachineViewer({ product, mode }) {
 const canvas=useRef(null),controller=useRef(null);const [view,setView]=useState('3d'),[available,setAvailable]=useState(true);
 useEffect(()=>{const instance=createViewer(canvas.current,()=>{setAvailable(false);setView('photo')});controller.current=instance;return()=>{controller.current=null;instance?.dispose()}},[]);
 useEffect(()=>{controller.current?.setMode(mode)},[mode]);
 useEffect(()=>{controller.current?.setActive(view==='3d')},[view]);
 const controls=[['left','↶','Rotate left'],['right','↷','Rotate right'],['in','+','Zoom in'],['out','−','Zoom out'],['reset','Reset view','Reset view']];
 return <>
 <div className="view-tabs" role="group" aria-label="Choose product view">{[['3d','Interactive 3D'],['photo','Product photo']].map(([key,label])=><button key={key} className={view===key?'active':''} aria-pressed={view===key} disabled={key==='3d'&&!available} onClick={()=>setView(key)}>{label}</button>)}</div>
 <div id="interactive-model" hidden={view!=='3d'}><canvas id="machine-canvas" ref={canvas} tabIndex={0} role="img" aria-label={'Interactive illustrative 3D '+product.name+'. Drag to rotate or use arrow keys. Plus and minus zoom. Home resets the view.'}/><div className="camera-controls" role="group" aria-label="3D camera controls">{controls.map(([action,label,accessible])=><button key={action} aria-label={accessible} onClick={()=>controller.current?.adjust(action)}>{label}</button>)}</div><p className="model-note">Illustrative 3D model · see photo for actual product</p></div>
 <div id="photo-model" hidden={view!=='photo'}><Image src={'/assets/'+product.image} alt={product.name} width={product.width} height={product.height} priority/></div>
 <p id="viewer-status" role="status">{!available?'3D is unavailable on this device. The product photo is shown instead.':view==='3d'?'Drag to rotate · use controls to zoom':'Actual product photo'}</p>
 </>;
}
