const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const makeToken=(id)=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
function validCredentials(email,password){
    return typeof email=='string'&& typeof password === 'string' && email.includes('@') && password.length >= 6;
}
router.post('/register',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!validCredentials(email,password)){
            return res.status(400).json({ error: 'Enter a valid email and a password of 6+ characters' });
        }
        if (await User.findOne({ email: email.toLowerCase() })) {
            return res.status(409).json({ error: 'This email is already registered' });
        }
        const hash=await bcrypt.hash(password,10);
        const user=await User.create({email,password:hash});
        res.status(201).json({token:makeToken(user._id),email:user.email});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error' });

    }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validCredentials(email, password)) {
      return res.status(400).json({ error: 'Enter a valid email and password' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Wrong email or password' });
    }
    res.json({ token: makeToken(user._id), email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;