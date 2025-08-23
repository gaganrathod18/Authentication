import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true, //timestamps: true is a quick and powerful way to add
    //createdAt: First save time
    //updatedAt: Last update time
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();// skip if unchanged
  this.password = await bcrypt.hash(this.password, 10);
  next();  // => tells i’m done hashing pass
});

userSchema.methods.matchPassword = function (enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User", userSchema);
export default User;
