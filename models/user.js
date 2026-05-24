const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

<<<<<<< HEAD
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: ''
    },

    avatarImage: {
        type: String,
        default: ''
    },

    bodyScanImage: {
        type: String,
        default: ''
    }

}, {

    timestamps: true
=======
  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    default: "",
  },

  avatarImage: {
    type: String,
    default: "",
  },

  bodyImage: {
    type: String,
    default: "",
  },
>>>>>>> 4df0be7 (Completed User Image Storage Module)
});

module.exports = mongoose.model('User', userSchema);