const mongooseConnection = require("../config/connection");
const { User: UserModel, Thought: ThoughtModel } = require("../models");
const { getRandomName: generateRandomName } = require("./data");

mongooseConnection.on("error", (error) => console.error(error));

mongooseConnection.once("open", async () => {
  try {
    console.log("Connection established");

    await UserModel.deleteMany({});
    await ThoughtModel.deleteMany({});

    const userList = [...Array(20)].map(() => {
      const generatedUsername = generateRandomName();
      const generatedEmail = `${generatedUsername.split(" ")[0]}${Math.floor(
        Math.random() * 99
      )}@gmail.com`;

      return { username: generatedUsername, email: generatedEmail };
    });

    await UserModel.create(userList);
    const fetchedUsers = await UserModel.find();

    const thoughtList = [...Array(20)].map((_, i) => {
      const randomThoughtText = `${i} thought text sample`;
      const randomUsername =
        fetchedUsers[Math.floor(Math.random() * 20)].username;
      const reactionList = [
        {
          reactionBody: `${i} wow`,
          username: fetchedUsers[Math.floor(Math.random() * 20)].username,
        },
        {
          reactionBody: `${i} not cool`,
          username: fetchedUsers[Math.floor(Math.random() * 20)].username,
        },
      ];

      return {
        thoughtText: randomThoughtText,
        username: randomUsername,
        reactions: reactionList,
      };
    });

    await ThoughtModel.create(thoughtList);
    const fetchedThoughts = await ThoughtModel.find();

    for (const thought of fetchedThoughts) {
      await UserModel.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      );
    }

    const userIdList = fetchedUsers.map((user) => user._id);

    for (let i = 0; i < 20; i++) {
      const selectedFriendIds = userIdList.filter(
        (id) => id !== userIdList[i] && Math.random() > 0.5
      );
      await UserModel.findOneAndUpdate(
        { _id: userIdList[i] },
        { $set: { friends: selectedFriendIds } }
      );
    }

    console.table(userList);
    console.table(thoughtList);
    console.info("your seed data has been successfully created!");
  } catch (error) {
    console.error("seed error", error);
  } finally {
    process.exit(0);
  }
});
