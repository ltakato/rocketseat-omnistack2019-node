const sharp = require('sharp');
const path = require('path');

const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      );

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    return res.json(post);
  }
};
