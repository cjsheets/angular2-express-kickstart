'use strict';

import mongoose from 'mongoose';

var ImageSchema = new mongoose.Schema({
  url: String,
  snippet: String,
  thumbnail: String,
  context: String
});

export default mongoose.model('Image', ImageSchema);
