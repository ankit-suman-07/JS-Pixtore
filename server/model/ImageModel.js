const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true
        }
    },
);

const Image = mongoose.model('Images', imageSchema);
module.exports = Image;