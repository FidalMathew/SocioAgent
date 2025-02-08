import { model, Schema } from "mongoose";

const userSchema = new Schema({
    useruuid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    twitterId: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    },
    githubId: {
        type: String,
        unique: true
    },
    cdpWalletAddress: { type: String, unique: true },

})

const User = model("User", userSchema);

export default User;