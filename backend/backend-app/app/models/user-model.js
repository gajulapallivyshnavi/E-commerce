import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    role: String,
    status: { type: String, default: "active" },
    // role:{
    //     type:String,
    //     enum:['admin','buyer' ,'seller']// mongodb validatiom
    // },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

export default User;
