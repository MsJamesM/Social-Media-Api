const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    /* Use Mongoose's ObjectId data type. Default value is set to a new ObjectId */
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    /* Set default value to the current timestamp. Use a getter method to format the timestamp on query */
  },
});

module.exports = reactionSchema;
