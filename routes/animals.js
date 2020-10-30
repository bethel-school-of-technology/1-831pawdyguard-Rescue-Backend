const express = require('express');
const multer = require('multer');

const Animal = require('../models/animal');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

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

router.post(
  '',
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const animal = new Animal({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename
      //, creator: req.userData.userId
    });
    animal.save().then((createdAnimal) => {
      res.status(201).json({
        message: 'Animal added successfully!',
        animal: {
          ...createdAnimal,
          id: createdAnimal._id,
        },
      });
    });
    // .catch((error) => {
    //   res.status(500).json({
    //     message: 'Creating an Animal card failed!',
    //   });
    // });
  }
);

router.put(
  '/:id',
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const animal = new Animal({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
      //, creator: req.userData.userId
    });
    Animal.updateOne({ _id: req.params.id }, animal).then((result) => {
    // /*** Authorization */ Animal.updateOne({ _id: req.params.id, creator: req.userData.userId }, animal).then((result) => {
      // /*** Auth works with .n or .nModified*/ if (result.nModified > 0) {   
    // if (result.n > 0) {
      res.status(200).json({ message: 'Animal Updated successfully!' });
      // } else {
      //   res.status(401).json({ message: 'Not authorized.' });
      // }
    });
    //this catch block is for technical errors (like if DB connection is lost)
    // .catch((error) => {
    //   res.status(500).json({
    //     message: 'Could not update animal information!',
    //   });
    // });
  }
);

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const animalQuery = Animal.find();
  let fetchedAnimals;
  if (pageSize && currentPage) {
    animalQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  animalQuery
    .then((documents) => {
      fetchedAnimals = documents;
      return Animal.count();
    })
    .then((count) => {
      res.status(200).json({
        message: 'Animals fetched successfully!',
        animals: fetchedAnimals,
        maxAnimals: count,
      });
    });
  // .catch((error) => {
  //   res.status(500).json({
  //     message: 'Fetching animals failed!',
  //   });
  // });
});

router.get('/:id', (req, res, next) => {
  Animal.findById(req.params.id).then((animal) => {
    if (animal) {
      res.status(200).json(animal);
    } else {
      res.status(404).json({ message: 'Animal not found!' });
    }
  });
  // .catch((error) => {
  //   res.status(500).json({
  //     message: 'Fetching animal failed!',
  //   });
  // });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Animal.deleteOne({ _id: req.params.id }).then((result) => {
  // /*** Authorization */  Animal.deleteOne({ _id: req.params.id, creator: req.userData.userId  }).then((result) => {
  // /*** Auth only .n available*/ if (result.n > 0) {
    // if (result.n > 0) {
    res.status(200).json({ message: 'Animal Deleted successfully!' });
    //   } else {
    //     res.status(401).json({ message: 'Not authorized to delete.' });
    //   }
    // })
    // .catch((error) => {
    //   res.status(500).json({
    //     message: 'Deleting the animal failed!',
    //   });
  });
});

module.exports = router;
