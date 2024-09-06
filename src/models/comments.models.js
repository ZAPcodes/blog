import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim:true
    },
    
},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);

