// Import necessary modules from 'mongoose'
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Thought schema definition: includes the Reaction schema as a subdocument.
const thoughtSchema = new Schema(
  {
    // The thoughtText field is a required string that must be between 1 and 280 characters long
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // The createdAt field is a date. Its default value is the current timestamp, and it's formatted with the dateFormat utility
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleString(),
    },
    // Username of the user who created the thought. This field is required.
    username: {
      type: String,
      required: true,
    },
    // The reactions field is an array of subdocuments based on the reactionSchema
    reactions: [reactionSchema],
  },
  {
    // When the schema is converted to JSON, virtuals are included and getter methods are used
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    // Disable the automatic creation of an `id` virtual getter in this schema
    id: false,
  }
);

// Virtual property 'reactionCount' that computes the number of reactions to a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// The thought schema is exported for use in the User model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
