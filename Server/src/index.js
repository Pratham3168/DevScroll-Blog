const express = require('express');
const dbConnect = require('./config/dbConnect');
const app =express();
app.use(express.json());

require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');



const cors = require('cors');
const cookieparser = require('cookie-parser');


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieparser());



dbConnect();


const PORT = process.env.PORT ;



app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);




app.listen( PORT ,()=>{
    console.log(`Server is Listening on PORT : ${PORT}`);
})