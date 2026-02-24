const express = require('express');
const dbConnect = require('./config/dbConnect');
const app =express();
app.use(express.json());

require('dotenv').config();

// ✅ Validate mandatory environment variables
const validateEnv = () => {
  const required = ['JWT_SECRET', 'MONGODB_URI', 'CONNECTION_STRING'];
  const hasMongoURI = process.env.MONGODB_URI || process.env.CONNECTION_STRING;
  
  const missing = required.filter(env => {
    if (env === 'MONGODB_URI' || env === 'CONNECTION_STRING') {
      return !hasMongoURI; // Either one is fine
    }
    return !process.env[env];
  });
  
  // Remove duplicates
  const uniqueMissing = required.filter(env => {
    if (env === 'CONNECTION_STRING' && process.env.MONGODB_URI) return false;
    if (env === 'MONGODB_URI' && process.env.CONNECTION_STRING) return false;
    return !hasMongoURI || !process.env[env];
  }).filter((v, i, a) => a.indexOf(v) === i);

  if (!process.env.JWT_SECRET) {
    console.error("❌ CRITICAL: JWT_SECRET is not set");
    console.error("   Add JWT_SECRET to your .env file");
    process.exit(1);
  }

  if (!hasMongoURI) {
    console.error("❌ CRITICAL: MongoDB URI is not configured");
    console.error("   Set either MONGODB_URI or CONNECTION_STRING environment variable");
    process.exit(1);
  }

  // Set NODE_ENV if not set
  if (!process.env.NODE_ENV) {
    console.warn("⚠️  NODE_ENV not set, defaulting to 'development'");
    process.env.NODE_ENV = 'development';
  }

  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ All required environment variables are set`);
};

validateEnv();

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