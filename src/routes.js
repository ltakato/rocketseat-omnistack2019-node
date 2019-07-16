const express = require('express');
const multer = require('multer');
const uploadsConfig = require('./config/upload');

const PostController = require('./controllers/PostController');

const routes = new express.Router();
const upload = multer(uploadsConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

module.exports = routes;
