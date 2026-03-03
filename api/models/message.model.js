
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    match: {
        type: mongoose.Types.ObjectId,
        ref: 'Match',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;