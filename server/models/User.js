const mongoose = require('mongoose');

// This is a "sub-schema" for the addresses
// It matches the form from your AddressOverlay
const AddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true }
});

// This is your main User schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [AddressSchema] // An array that holds addresses
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;