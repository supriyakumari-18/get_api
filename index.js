const express=require('express')
const app=express();
app.use(express.json())

let students=[
    {id:1,"name":"Sita","email":"sita12@gmail.com","address":"Sonho","age":15},
    {id:2,"name":"Ram","email":"ram34@gmail.com","address":"Maker","age":16},
    {id:3,"name":"Shyam","email":"shyam57@gmail.com","address":"Chapra","age":14}
]

app.get('/students',(request,response)=>{
    return response.status(200).json({message:"Data fetched successfully",data:students})
})


app.get('/student/:id',(request,response)=>{
    const sid=parseInt(request.params.id);
    const student=students.find(s=>s.id===sid)

    if(!student){
        return response.status(404).json({message:"Student not found"})
    }
    else{
        return response.status(200).json({message:"Student fetched successfully",
            data:student
        })
    }
})


app.get('/student/name/:name',(request,response)=>{
    const sName=request.params.name;
    const student=students.find(s=>s.name===sName)

    if(!student){
       return response.status(404).json({message:"Student not found"})
    }
    else{
        return response.status(200).json({message:"Student fetched successfully",data:student})
    }
})


app.post('/addstudent',(request,response)=>{
  const  student=request.body
  students.push(student)

  return response.status(201).json({message:"Student added successfully",
    data:student
  })
})

app.put('/updatestudent/:id',(request,response)=>{
const sid=parseInt(request.params.id);
const{name,email,address,age}=request.body
const sindex=students.findIndex(s=>s.id===sid)

if(sindex==-1){
  return response.status(201).json({
    message:"Student not found",
   
})
}

students[sindex]={id: sid,name,email,address,age}

return response.status(201).json({
    message:"Updated successfully",
    data:students
})
})


app.patch('/students/:id',(request,response)=>{
const id=parseInt(request.params.id)
const student=students.find(s=>s.id===id)
if(!student){
    return response.status(404).json({message:"Student not found"})
}
if(request.body.address){
student.address=request.body.address
}
return response.status(201).json({
    message:"Updated Successfully",
    data:student})
})



app.delete('/students/:id',(request,response)=>{
const sid=parseInt(request.params.id)
const index=students.findIndex(s=>s.id===sid)


if(index===-1){
    return response.status(404).json({
        message:"Student not found",
    })
}

const deletestudent=students.splice(index,1)
})

app.listen(4000,()=>{
    console.log("Server is running")
})