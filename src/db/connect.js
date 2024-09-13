const mongoose = require("mongoose");
const connectDB=async ()=>{
  try{
    await mongoose.connect('mongodb+srv://workforabhinavkumar:abhinav@cluster.3dbdr.mongodb.net/')
  console.log('connected to Database')
  }

  catch(err){
    console.log('error')
  }
}
module.exports = connectDB;