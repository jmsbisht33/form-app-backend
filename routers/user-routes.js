const express = require("express");
const User = require("../model/Users");
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/signup', async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const userExsists = await User.findOne({ email });
        if(userExsists) return res.status(400).json({ message: 'Email already taken' });

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedpassword
        })

        user.save();

        res.status(200).json("registered successfully")
    } catch (error) {
        console.log(error);

        res.status(400).json("Something went wrong");
    }
});

router.post('/signin', async (req,res) => {
    try {
        const { email, password } = req.body;
        const userExsists = await User.findOne({ email });
        if(!userExsists) return res.status(400).json({ message: 'Incorrect username or password.' });

        const passwordMatch = await bcrypt.compare(password, userExsists.password);
        if(!passwordMatch) return res.status(400).json({ message: 'Incorrect username or password.' });
        const { _id, name, email: useremail } = userExsists;
        const user = {
            _id,
            name,
            email: useremail
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);

        res.status(400).json("Something went wrong");
    }
});

module.exports = router;