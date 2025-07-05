import mongoose,{Schema} from "mongoose";


const notesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['Work','Study','Personal'],
        default:"Personal",
        required:true
    } 
},{timestamps:true})


export const Notes = mongoose.model('notes',notesSchema)