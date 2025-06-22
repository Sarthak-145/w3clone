import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register a new user
export const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    console.log('OMG, new login!', req.body);
    try {
        //checking if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist '});
        }

        //Hasing the password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = await User.create({
            name,
            email,
            password: hashedpassword,
        });

        //creting token
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    }
    //catching error
    catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid Credentials' });
        }

        //Creating token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.status(200).json({
            token, user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    
    catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message})
    }
}    
    
