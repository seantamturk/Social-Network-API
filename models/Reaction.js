const { Schema, Types } = require("mongoose");

// Schema for a Reaction
const reactionSchema = new Schema(
  {
    // Each reaction has an auto-generated unique ID
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // Reaction body should have at most 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // The username who created the reaction
    // If you have a User collection, consider making this a reference to a User document
    username: {
      type: String,
      required: true,
    },
    // Automatically set the date of the reaction's creation
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, // Prevent virtual `id` field, since `reactionId` is already unique
  }
);

module.exports;
