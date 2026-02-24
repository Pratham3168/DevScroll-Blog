const Post = require('../models/post.model');

const createPost = async (req, res, next) => {
  try {
    // Debug: Check if user is authenticated
    console.log('📝 Creating post - User info:', {
      hasUser: !!req.user,
      userId: req.user?.id,
      isAdmin: req.user?.isAdmin,
    });

    if (!req.user || !req.user.isAdmin) {
      console.error('❌ Post creation denied - User not admin or not authenticated', {
        hasUser: !!req.user,
        isAdmin: req.user?.isAdmin,
      });
      return res.status(403).json({ message: 'Only admin can create posts' });
    }

    if (!req.body || !req.body.content || !req.body.title) {
      console.error('❌ Post creation failed - Missing required fields', {
        hasTitle: !!req.body?.title,
        hasContent: !!req.body?.content,
      });
      return res.status(400).json({ message: 'Content and title are required' });
    }

    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    console.log('✅ Post created successfully:', { postId: savedPost._id, slug });
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('❌ Post creation error:', error.message);
    next(error);
  }
};

const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};




const deletePost = async (req, res, next) => {

  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return res.status(403).json({ message: 'You are not allowed to delete this post' });
  }
  try{
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
}


const updatePost = async (req,res,next) => {

  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return res.status(403).json({ message: 'You are not allowed to update this post' });
  }

  try{
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId,
      { $set: {
        title : req.body.title,
        content : req.body.content,
        image : req.body.image,
        category : req.body.category,
      }}, {
      new: true,
    });
    res.status(200).json(updatedPost);
  }catch (error) {
    next(error);
  }

}


module.exports = { createPost, getposts, deletePost , updatePost };
