import mongoose, {Schema}from "mongoose"

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        unique:true
    },
    fullName: {
        type: String,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required:[treu, "Password is required"],
    },
    profilePicture: {
        type: String,
        default: ""
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],  
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    }

    
    
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;


