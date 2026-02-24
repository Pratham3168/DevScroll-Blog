const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId : {
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        category:{
            type:String,
            default:'uncategorized'
        },
        image:{
            type:String,
            default:'https://www.bertelsmann-stiftung.de/fileadmin/files/_processed_/a/c/csm_Fotolia_64336912_X_Original_41023_d2446515ba.jpg'
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
    },
    {timestamps:true}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
