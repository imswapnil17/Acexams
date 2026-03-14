import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        class: { type: String },
        subjects: { type: Array },
        Board: String,
        tasks: [{ type: Schema.Types.ObjectId, ref: "Tasks" }]

    }
)
const User = mongoose.model("User", userSchema)
export default User