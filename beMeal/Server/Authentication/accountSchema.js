import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userID: { type: String, required: true, unique: true }, // Matches the User's userID
  userName: { type: String, required: true, unique: true},
  password: { type: String, required: true},
//   email: { type: String, required: true, unique: true},
}, {
    timestamps: true // add timestamps createdAt and updatedAt to document
}
);

// Hash password before saving to database
accountScheme.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
