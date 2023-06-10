const mongoose=require('mongoose');

//  const dbConnect=()=>{
//     mongoose.connect(process.env.MONGOOSE,()=>{
//         console.log('connection succesful')
//     })
// }
// module.exports=dbConnect
mongoose.connect(process.env.MONGOOSE)
const db=mongoose.connection;
db.on("connected",()=>{
    console.log("connection succesfull")
})
db.on("error",()=>{
    console.log("connection failed")
})