const mongoose=require('mongoose');
const documentSchema=new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true 
    },
    filename:{
        type:String,
        required:true
    },
    pageCount:Number,
    chunkCount:Number,
},{timestamps:true}
);
module.exports=mongoose.model('Document',documentSchema);