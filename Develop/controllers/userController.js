const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get one user by ID
  async getUserByID(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      if (!user) {
        return res.status(404).json({ error: "No user with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // post user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        message: "User created",
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // put user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json({ message: "User updated", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json({ message: "User deleted", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend
  async createFriend(req, res) {
    try {
      const { friendId } = req.body;
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.status(200).json({ message: "Friend added", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete friend
  async deleteFriend(req, res) {
    try {
      const { friendId } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json({ message: "Friend deleted", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
