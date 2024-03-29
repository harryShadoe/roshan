
const model = require('../models')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const homePage = (req, res)=>{
res.send("This is home Page!")
}

//register page
const register=async(req,res)=>{
      try {
        var data=req.body;
      var hashpassword= await bcrypt.hashSync(data.password, 10)
       // var result= await model.user.findOne({where:{phone:data.phone}});
  
    // if(result) return res.status(200).json({message:"Phone number already taken"})
    var addData= await model.user.create({
      fullname:data.fullname,
      phone:data.phone,
      email:data.email,
      password:hashpassword
    });
    res.status(201).json({message:"User Registered Successfully!!!"})
   } catch (error) {
        console.log(error.message)
      }
  
  }



  //login controller
const login =async(req, res)=>{


  try {

    var {phone, password} = req.body;
    if(!phone || ! password) return res.json({Message:"Phone and passowrd are required!"})

    var result = await model.user.findOne({where:{phone}})
    if(result) {
      var ismatched =  bcrypt.compareSync(password, result.password)
      if(!ismatched) return res.json({message:"Invalid  user credientials"})
        //jwt token
       var token =  jwt.sign({id:result.id, phone:result.phone}, process.env.JWT_KEY,{expiresIn:"1d"} )
       console.log(token)
       res.status(200).json({message:"User loggedin sucessfully", token:token})
    }
    else{
       res.status(404).message({Message:"No user found please register!"})
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Error occured during login"})
  }


}



  //exporting controllers
module.exports = {homePage:homePage, 
    register:register,
    login:login};