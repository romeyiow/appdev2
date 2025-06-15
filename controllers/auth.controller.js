// controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


// Joi schema for signup
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Joi schema for signin
const signinSchema = Joi.object({
    login: Joi.string().required(), 
    password: Joi.string().required()
});

const signup = async (req, res) => {
    try {
        // 1. Validate request body
        const { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { username, email, password } = value;

        // 2. Check if user already exists (username or email)
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict
                success: false,
                message: "Username or email already taken."
            });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and save new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // 5. Return success response (without the password)
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: { 
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        // Mongoose validation errors 
        if (error.code === 11000) { // Duplicate key error
             return res.status(409).json({
                success: false,
                message: "Username or email already exists."
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during registration."
        });
    }
};
const signin = async (req, res) => {
    try {
        // 1. Validate request body
        const { error, value } = signinSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { login, password } = value;

        // 2. Find user by username or email
        const user = await User.findOne({
            $or: [{ email: login.toLowerCase() }, { username: login }]
        }).select('+password');

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials." 
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials." 
            });
        }

        // 4. Generate JWT
        const payload = {
            user: {
                id: user._id,
                username: user.username 
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // 5. Return token
        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token: token,
            user: { 
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during signin."
        });
    }
};

module.exports = {
    signup,
    signin 
};