import mongoose, { mongo }  from "mongoose";   

const UserSchema = new mongoose.Schema({
    clerkId :{
        type: String ,
        required : true ,
        unique : true
    },
    emial :{
        type: String ,
        required : true ,
        unique : true
    },
    fullName :{
        type: String ,
        required : true ,
    },
    profilePic :{
        type: String ,
        default:""
    },
},{timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User 