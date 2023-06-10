const express=require('express');
const cors=require('cors');
const router=require("./routes/busroute.js")
const slaes =require("./routes/salesRoute.js")

require('dotenv').config()
const dbConnect=require("./config/connect.js")
const app=express()

app.use(cors())





app.use(express.json())
app.use("/buses",router)
app.use("/sales",slaes)



app.listen(5000,()=>{
    console.log('in')
})


