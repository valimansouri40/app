import React, {useState,useEffect,useRef}  from 'react';

import tool1 from './assets/pencil.svg';
import tool2 from './assets/fill.svg';
import tool3 from './assets/rectangle.svg';
function App() {
  const [ctx, setctx]= useState();
  const [Ispainting,setIspainting]= useState(false);
  const [click, setclick]= useState();
  const [value,setvalue]=useState('');
  const [name, setname]= useState();
  const [img,setimg]= useState(null);
  const [file,setfile]= useState();
  const [txt,settxt]= useState('');
  let canvass= useRef()
  let imgref= useRef();
  let filepdf= useRef();
  useEffect(()=>{
    const  canvas= canvass.current;
    canvas.height = window.innerHeight- 100;
    canvas.width = window.innerWidth - 14 ;
    const context= canvas.getContext('2d');
    setctx(context)
    
      const text= imgref.current;
      ;
      text.onload=()=>{
        
        ctx.drawImage(text, 550,100,400,400);
        
      }
      
      
  },[img,ctx])
  const startpath=(e)=>{
    setIspainting(true);
    if(e === 'text'){
      let rect = e.target.getBoundingClientRect();
      let mosetxl = e.clientX - rect.left;
      let mosetxr = e.clientY - rect.top;
    }
    paint(e);
   
    
}
const endpath= ()=>{
    setIspainting(false);
 ctx.beginPath()
}
const paint=(e)=>{
  let rect = e.target.getBoundingClientRect();
  const text= imgref.current;
  
   let mosetxl = e.clientX - rect.left;
   let mosetxr = e.clientY - rect.top;
  
   if(Ispainting){
     switch(click){
        case "path":{
          ctx.lineWidth = name;
          ctx.lineCap = "round";
          ctx.strokeStyle=value ;
  
         ctx.lineTo(mosetxl, mosetxr);
         ctx.stroke();
  
         ctx.beginPath();
         ctx.moveTo(mosetxl, mosetxr);
        }
        break;
        case 'stroke':{
          ctx.clearRect(e.clientX, e.clientY,mosetxl,mosetxr);
          
        };
        break;
        
        default: break
     }
   }
}
   const imagehandller =(event)=>{
     
       setimg( URL.createObjectURL(event.target.files[0]))
       
   }
   const filehandller=(event)=>{
    setfile( URL.createObjectURL(event.target.files[0]))
   }
   const pakhanddler=()=>{
     setimg(null);
   }
   const pakhanddlers=()=>{
    setfile(null);
  }
   const textclick=(e)=>{
    let rect = e.target.getBoundingClientRect();
  
    let mosetxl = e.clientX - rect.left;
    let mosetxr = e.clientY - rect.top;
     if(click === "text"){
     
      ctx.fillText(txt,mosetxl, mosetxr);
      ctx.font = `${name}pt Calibri`;
     }else if(click === "fill"){
      ctx.fillRect(mosetxl, mosetxr,e.clientX - rect.left  ,e.clientY - rect.top );
      ctx.fillStyle = value;
      ctx.closePath();
     }
   }
  const saveCanvas=()=>{
    const canvasSave = canvass.current
    const d = canvasSave.toDataURL('image/png');
    const w = window.open('about:blank', 'image from canvas');
    w.document.write("<img src='"+d+"' alt='from canvas'/>");
    console.log('Saved!');
  }
    return (
      
      <div style={{position:"relative"}}>
       <img 
        ref={imgref}
       id='im'onMouseDown={startpath}
         style={{display: 'none'}}
          src={img} ></img>
       <canvas style={{border: '4px solid #111',marginLeft: 4, }}
        id="canvas"
        ref={canvass}
        onClick={textclick}
        onMouseDown={startpath}
        onMouseUp={endpath}
        onMouseMove={paint}
        
        >

        </canvas>
        {file?<iframe style={{position: "absolute",top:"30%",height:"30rem",width:"30rem", left:"50%", transform:"translate(-50%,-50%)"}} ref={filepdf} src={file}></iframe>:null}

        <div style={{width:'100%',
      display:"flex",alignItems: "center", justifyContent: "space-around", height:80, background: "#111"}}>
        <button onClick={()=>setclick('path')} ><img src={tool1} /></button>
        <button onClick={()=>setclick('fill')} ><img src={tool3} /></button>
        <button onClick={()=>setclick('stroke')} ><img src={tool2} /></button>
        <button onClick={()=>setclick('text')}  style= {{fontSize:"1.5rem"}}>A</button>
        <input type="text" placeholder="نوشتن متن" onChange={e=>settxt(e.target.value)}/>
        <input type='color'  value={value} onChange={e=>setvalue(e.target.value)} />
        <input type="range" min="3" max="36" value={name} onChange={e=>setname(
    e.target.value)}/>
    
    
      <label for="img" style={{color:"#fff",fontSize:"1.5rem"}}>انتخاب عکس</label>
      <input type="file" id="img" name="file" style={{visibility:'hidden',display: 'none'}}  onChange={imagehandller}  />
      <label for="file" style={{color:"#fff",fontSize:"1.5rem"}}>انتخاب فایل</label>
      <input type="file" id="file" name="file" style={{visibility:'hidden',display: 'none'}}  onChange={filehandller}  />
      <button onClick={saveCanvas} style= {{fontSize:"1.5rem"}} >ذخیره</button>
    {img?<button onClick={pakhanddler} style= {{fontSize:"1.5rem"}}>پاک کردن عکس</button>:null}
    {file?<button onClick={pakhanddlers} style= {{fontSize:"1.5rem"}}>پاک کردن فایل</button>:null}
    </div>
    
      </div>
     
    );
  
}

export default App;
