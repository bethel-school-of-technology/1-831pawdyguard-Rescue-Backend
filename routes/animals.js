const express = require('express');
const multer = require('multer');

const Animal = require('../models/animal');

const router = express.Router();

const MEDIA_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

//configuring multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {      //cb callback
    const isValid = MEDIA_TYPE_MAP[file.mediatype];
    let error = new Error('Invalid media type');
    if (isValid) {
      error = null;
    }
    // cb(null, "/backend/images");
    cb(error, '/backend/images'); //check "/images"
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MEDIA_TYPE_MAP[file.mediatype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

router.post("",
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const animal = new Animal({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,  
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
  }
);

router.put("/:id",
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/backend/images/' + req.file.filename;
    }
    const animal = new Animal({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    Animal.updateOne({ _id: req.params.id }, animal).then((result) => {
      res.status(200).json({ message: 'Update successful!' });
    });
  }
);

router.get("", (req, res, next) => {
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
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Fetching animals failed!',
      });
    });
});

//get request for single animal
router.get("/:id", (req, res, next) => {
  Animal.findById(req.params.id).then((animal) => {
    if (animal) {
      res.status(200).json(animal);
    } else {
      res.status(404).json({ message: 'Animal not found!' });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Animal.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Animal deleted!' });
  });
});

module.exports = router;