const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create User model
const userSchema = new Schema(
  {
    // Define the username field as a trimmed, required string that must be unique
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the email field as a required string that must be unique and match a valid email pattern
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    // Define thoughts as an array of ObjectId references to the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // Define friends as an array of ObjectId references to the User model (self-referencing)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  // Enable the use of virtuals and getters when the document is transformed to JSON
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    // By default, Mongoose adds an `id` virtual getter to your schema set to `_id.toHexString()`. If you don't want an `id`, you can disable it in your schema's options.
    id: false,
  }
);

// Create a virtual property 'friendCount' that returns the length of the user's friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
