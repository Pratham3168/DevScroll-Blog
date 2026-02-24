const express = require('express');
const { ping, updateUser, deleteUser,signoutUser, getUsers, getUser } = require('../controller/user.controller');
const { verifyToken } = require('../Middleware/verifyUser');
const app = express();
const router = express.Router();


router.get('/ping',ping);
router.put('/update/:userId', verifyToken ,updateUser);
router.delete('/delete/:userId', verifyToken ,deleteUser);
router.post('/signout' ,signoutUser);
router.get('/getusers' ,verifyToken,getUsers);
router.get('/:userId', getUser);






module.exports = router;


