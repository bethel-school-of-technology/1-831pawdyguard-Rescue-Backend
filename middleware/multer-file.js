const multer = require('multer');

const MEDIA_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

//configuring multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb callback
    const isValid = MEDIA_TYPE_MAP[file.mediatype];
    let error = new Error('Invalid media type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images'); //or try "/images"
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MEDIA_TYPE_MAP[file.mediatype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

module.exports = multer({ storage: storage }).single('image');
