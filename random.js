
const  express=require ('express');
const app=express();
const db=require('./db');
app.use(express.json());

app.post('/department',(req,res)=>{
    const {department_name,department_code,established_year}=req.body;

    const sqlQ="INSERT INTO department(department_name,department_code,established_year) VALUES (?,?,?)";

    db.query(sqlQ,[department_name,department_code,established_year],(err,result)=>{
        if(err){
            return res.status(500).json({message:"Database insert failed",err})
        }
         return res.status(201).json({
            message:"New Data added successfully.",
             department_name,department_code,established_year
        })
    })
})


app.get('/department',(req,res)=>{
   const sqlQ= "SELECT * FROM department";

   db.query(sqlQ,(err,result)=>{
   if(err){
     return res.status(500).json({message:"Internal Server Error"})
   }
     return res.status(200).json({
    message:"Data fetched successfully",
    result
   })
 })
})


app.put('/department/:id', (request, response) => {
    const dId = parseInt(request.params.id);
    const { department_name,department_code,established_year } = request.body;

    const sqlQ = "UPDATE department SET department_name=?,department_code=?, established_year=? WHERE id=?";
    db.query(sqlQ, [department_name,department_code,established_year,dId], (error, result) => {

        if (error) {
            return response.status(500).json({
                message: "Server Internal Error"
            });
        }
        if (result.affectedRows === 0) {
            return response.status(404).json({
                message: "Data Not Found"
            });
        }
        return response.status(200).json({
            message: "Data Updated Successfully",
           department: { department_name,department_code,established_year}
        });
    });
});


app.delete('/delete/id/:id',(req,res)=>{
const dId=parseInt(req.params.id);
const sqlQ="DELETE FROM department WHERE id=?";

db.query(sqlQ,[dId],(error,result)=>{
   if(error){
          return   res.status(500).json({message:"Server internal Errors:"+error})
        }
  if(result.affectedRows===0){

  return res.status(404).json({
        message:"Data Not Found"
    }) 

        }
        else{
            
     return res.status(201).json({
        message:"Data Deleted Successfully",
        dId
    }) 
        }

    })
})

app.listen(5000,()=>{
    console.log("Server is running.....")
})