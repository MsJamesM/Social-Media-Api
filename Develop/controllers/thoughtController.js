const { Thought } = require("../models");

module.exports = {
  // get all
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get one
  async getThoughtByID(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // post thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json({
        message: "Thought created",
        thought,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // put thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.status(200).json({ message: "Thought updated", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.status(200).json({ message: "Thought deleted", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No reaction with that ID" });
      }
      res.status(200).json({ message: "Reaction added", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete reaction
  async deleteReaction(req, res) {
    try {
      const { reactionId } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No reaction with that ID" });
      }
      res.status(200).json({ message: "Reaction deleted", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
