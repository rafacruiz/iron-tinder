
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    pics: {
        type: [String],
        minLength: 1
    },
    preferences: {
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'everyone']
        },
        ageMin: {
            type: Number,
            min: 18,
            default: 18,
        },
        ageMax: {
            type: Number,
            default: 99,
        },
        maxDistance: {
            type: Number,
            default: 50,
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    likedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    passedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]

}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.password;
        },
    }
});

userSchema.index({ location: "2dsphere" });

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;