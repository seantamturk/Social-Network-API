// Import the required modules
const router = require("express").Router();
const {
  addFriend,
  deleteFriend,
  getSingleUser,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} = require("../../controllers/userController");

// Set up routes for the base '/api/users' endpoint
// GET for fetching all users and POST for creating a new user
router.route("/").get(getUsers).post(createUser);

// Set up routes for the '/api/users/:userId' endpoint
// GET for fetching a specific user, PUT for updating a user, and DELETE for deleting a user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Set up routes for the '/api/users/:userId/friends/:friendId' endpoint
// POST for adding a friend to a user's friend list and DELETE for removing a friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router to be used in other parts of the application
module.exports = router;
