const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product // Include associated Products
  })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: Product // Include associated Products
  })
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'Category not found.' });
      } else {
        res.json(result);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(result => {
      res.status(201).json(result); // Use status 201 for successful creation
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err); // Use status 400 for bad request
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(result => {
      if (result[0] === 0) {
        res.status(404).json({ message: 'Category not found.' });
      } else {
        res.json({ message: 'Category updated successfully.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      if (result === 0) {
        res.status(404).json({ message: 'Category not found.' });
      } else {
        res.json({ message: 'Category deleted successfully.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
