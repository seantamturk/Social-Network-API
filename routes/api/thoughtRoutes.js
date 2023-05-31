// Import required modules
const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Route for /api/thoughts
// GET method for fetching all thoughts and POST method for creating a new thought
router
  .route("/")
  .get(getThoughts)  // Fetch all thoughts
  .post(createThought);  // Create a new thought

// Route for /api/thoughts/:thoughtId
// GET method for fetching a single thought, PUT for updating a thought and DELETE for deleting a thought
router
  .route("/:thoughtId")
  .get(getSingleThought)  // Fetch a single thought
  .put(updateThought)  // Update a thought
  .delete(deleteThought);  // Delete a thought

// Route for /api/thoughts/:thoughtId/reactions
// POST method for creating a new reaction to a thought
router
  .route("/:thoughtId/reactions")
  .post(createReaction);  // Create a new reaction

// Route for /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE method for deleting a reaction to a thought
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);  // Delete a reaction

// Export router to be used by the application
module.exports = router;
