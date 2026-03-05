
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    users: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }],
        validate: {
            validator: (arr) => arr.length === 2,
            message: 'Maximo dos',
        }
    },
    matchedAt: {
        type: Date, 
        default: Date.now
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    }
});

const Match = mongoose.model('Match', matchSchema);

export default Match;