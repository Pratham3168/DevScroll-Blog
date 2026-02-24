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


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://dev-scroll-blog.vercel.app",
  process.env.FRONTEND_URL || "" // Allow dynamic frontend URL for flexibility
].filter(Boolean); // Remove empty strings

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieparser());



dbConnect();


const PORT = process.env.PORT || 2068;


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);




app.listen( PORT ,()=>{
    console.log(`Server is Listening on PORT : ${PORT}`);
})