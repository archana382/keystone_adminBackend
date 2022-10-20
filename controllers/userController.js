const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User =  require("../models/userModel");
const sendToken = require("../utils/jwtToken");


// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  
    const { name,username, email, department, password } = req.body;
  
    const user = await User.create({
      name,
      username,
      email,
      department,
      password,
      
    });
    
    // const token = getJWTToken();

    // res.status(201).json({
    //   success,
    //   token,
    // })
    sendToken(user, 201, res);
    
  });


// Login user
exports.loginUser = catchAsyncError (async (req,res,next)=>{

    const {username, password} = req.body;

    //checking if user have given password and username both

    if(!username || !password){
        return next(new ErrorHandler("Please Enter Username and Passowrd", 400));
    }

    const user = await User.findOne({ username}).select("+password");

    if(!user){
        return next (new ErrorHandler("Invalid username or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next (new ErrorHandler("Invalid username or password",401));
    }
    
    sendToken(user,200,res);

});


// Logout User
exports.logout = catchAsyncError(async(req,res,next)=>{

  res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
  });

  res.status(200).json({
      success:true,
      message:"Logged out",
  });
});

//Create User

exports.createUser =  catchAsyncError(async (req, res, next) => {
  // req.body.user= req.user.id;

  const user =  await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });

});


//Get User Details

exports.getUserDetails =  catchAsyncError(async(req,res,next)=>{

  const user = await User.findById(req.user.id);

  res.status(200).json({
      success:true,
      user,
  });
})

 // Get all users (admin)
 exports.getAllUser = catchAsyncError(async(req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
      success: true,
      users,
  });
});

// Get single users -- Admin
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id);

  if(!user){
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
  }

  res.status(200).json({
      success: true,
      user,
  });
});


//Update User -- Admin
exports.updateUser = catchAsyncError(async(req, res, next) => {
  const newUserData={
    name:req.body.name,
    username: req.body.username,
    email: req.body.email,
    department: req.body.department,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new:true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
  });


})

//Delete User -- Admin
exports.deleteUser =  catchAsyncError(async(req,res,next)=>{
 
  const user = await User.findById(req.params.id);
  // remove cloudinary later

  if (!user){
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
  }
 
  await user.remove();

  res.status(400).json({
      success: true,
      message: "User Deleted Successfully"
  });
});
