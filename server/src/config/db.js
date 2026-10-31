const mongoose=require('mongoose');
modeule.exports=async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}