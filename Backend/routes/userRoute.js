const router=require("express").Router();
const User =require("../models/usersModel.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const authMiddleware=require("../middlewares/authMiddleware.js")
router.post("/register",async (req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
  try{
    existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(500).send({
            message:"user Already exists",
            success:false,
            data:null
        })
        }
        const hashedPassword=await bcrypt.hashSync(password)
const user=new User({
    name,
    email,
    password:hashedPassword,
    // blogs:[]
});
await user.save();
if(user){
    return res.send({
        message:"user created succesfully",
        success:true,
        data:null
    })
    }
}catch(err){
console.log(err)
}

// if(existingUser){
// return res.status(400).json({message:"user already exist:login instead"})
// }
// const hashedPassword=await bcrypt.hashSync(password)
// const user=new User({
//     name,
//     email,
//     password:hashedPassword,
//     // blogs:[]
// });
// console.log(user)
// try {
//     await user.save();
// } catch (err) {
    
// console.log(err)
// }
// return res.status(201).json({user})
})


 router.post("/login",async (req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
  try{
    existingUser=await User.findOne({email})
    if(!existingUser){
        return res.send({message:"user not found ",
     success:false,
     data:null
    })
        }

const isCorrectPassword= await bcrypt.compareSync(password,existingUser.password)
if(!isCorrectPassword){
    return res.send({message:"user not found ",
    success:false,
    data:null
   })}
   const token=jwt.sign(
    {id:existingUser._id},
    "token",{
        expiresIn:"1d"
    }
   )
   res.send({
    message:'user logged in succesfully',
    success:true,
    data:token
   })
}catch(err){
    res.send({
        message:'error',
        success:false,
        data:null
       })
 return res.status(400).json({message:"Incorrect password"})
 // }
}
// if(!existingUser){
// return res.status(404).json({message:"user not found  "})
// }
// const isCorrectPassword=bcrypt.compareSync(password,existingUser.password)
// if(!isCorrectPassword){
//     return res.status(400).json({message:"Incorrect password"})
// }
// return res.status(200).json({message:"logged in succesfully",user:existingUser})
})



router.post('/getuser',authMiddleware,async(req,res)=>{
    try {
        const user=await User.findById(req.body.userId);
        res.send({
            message:'user fetched succesfully',
            success:true,
            user:user
        })
        console.log(user)
    } catch (error) {
        return res.status(401).send({
            message:"Auth Failed bro",
           succes:false
        })
    }
})

module.exports=router 