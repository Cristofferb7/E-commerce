const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product
  })
  .then(results => {
    res.json(results)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: Product
  })
  .then(results => {
    res.json(results)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(results => {
    res.json(results)
  })
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
  .then(results => {
    res.json(results)
  })

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    id: req.params.id
  })
  .then(results => {
    res.json(results)
  })
});

module.exports = router;
