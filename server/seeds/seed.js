const db = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Post.deleteMany({});
    await Post.create(postSeeds);

    console.log('all done');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
