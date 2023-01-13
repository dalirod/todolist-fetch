import React, { useState,useEffect } from "react";

const Todolist = ()=>{
//agregar tareas de la API
useEffect(()=>{
  fetch(url).then((response)=>{
  return response.json()
  }).then((data)=>{
    setListaTareas(data)
  })
},[])

const [tarea,setTarea]= useState({
    label: "",
    done:false,
});


const [listaTareas,setListaTareas]= useState([
  
        
]);


const borrarTarea = async(id) =>{
let nuevalista= listaTareas.filter((item,index)=>id !== index)

//setListaTareas(nuevalista)

try{ let response = await fetch( url,{
    method: "PUT",
    headers : {
    "Content-Type": "application/json"
    },

body: JSON.stringify(nuevalista)
})

if(response.ok){

    setListaTareas(nuevalista)
}



}catch(error){
    console.log(error)
} 
}





const url = "https://assets.breatheco.de/apis/fake/todos/user/daliasca"




const change=(event)=>{
console.log(event.target.value)
setTarea({
...tarea,
[event.target.name] : event.target.value
})    

}




const imprimirTarea = async ({key})=>{
    if(key === "Enter"){
    if(tarea.label.trim() !== " " ){
        try{ let response = await fetch( url,{
            method: "PUT",
            headers : {
            "Content-Type": "application/json"
            },
        
        body: JSON.stringify([ ...listaTareas,tarea])
        })

        if(response.ok){
         //   getTask()
            setListaTareas([...listaTareas,tarea])
        }

        
        
        }catch(error){
            console.log(error)
        } 
        


     setTarea({
        label: "",
        done : false,
   
   
       })
    }
}

}






    return (

<div className="container">
<h1>Todos</h1>
<div className=" col-12 col-md-7 border ">
<input className="form-control" placeholder= "whats be to be done?" name="label" value={tarea.label} onChange={change} 
onKeyDown={imprimirTarea} ></input>
</div>
<div className="col-12 col-md-7 border ">
    {listaTareas.map((item,index) =>{
        return (
        <div key={index} className="border" onClick={()=>borrarTarea(index)}> {item.label}  </div>
        
        )
    })
}

{`${listaTareas.length} item list`}
</div>
</div>

    );
}


export default Todolist;