const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default:0
    }
    

},{timestamps:true});


const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

module.exports = Comment;
