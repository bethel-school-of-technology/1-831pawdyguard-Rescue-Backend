//moving the methods; middleware from routes/animals.js file

const Animal = require('../models/animal');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const animal = new Animal({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
  });
  animal
    .save()
    .then((createdAnimal) => {
      res.status(201).json({
        message: 'Animal added successfully!',
        animal: {
          ...createdAnimal,
          id: createdAnimal._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Creating an Animal card failed!',
      });
    });
};

exports.updateAnimal = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const animal = new Animal({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
  });
  Animal.updateOne({ _id: req.params.id }, animal)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Animal Updated successfully!' });
      } else {
        res.status(401).json({ message: 'Not authorized.' });
      }
    })
    //this catch block is for technical errors (like if DB connection is lost)
    .catch((error) => {
      res.status(500).json({
        message: 'Could not update animal information!',
      });
    });
};

exports.getAnimals = (req, res, next) => {
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
};

exports.getAnimal = (req, res, next) => {
  Animal.findById(req.params.id)
    .then((animal) => {
      if (animal) {
        res.status(200).json(animal);
      } else {
        res.status(404).json({ message: 'Animal not found!' });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Fetching animal failed!',
      });
    });
};

exports.deleteAnimal = (req, res, next) => {
  Animal.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Animal Deleted successfully!' });
      } else {
        res.status(401).json({ message: 'Not authorized to delete.' });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Fetching posts failed!',
      });
    });
};
