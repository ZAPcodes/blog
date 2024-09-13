import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    caption: {
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        required: true,
    },  
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }], 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps:true});

const Post = mongoose.model("Post", postSchema);

export default Post;    

