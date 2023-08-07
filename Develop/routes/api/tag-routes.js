const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include:[ Category, { 
      model: Product, 
      through: ProductTag
    }
  ]
})
.then(tags => {
  res.json(tags);
})
.catch(err => {
  res.status(500).json(err);
});
});
  // be sure to include its associated Product data


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id, {
      include: [
        { model: Product, through: ProductTag }
      ]
    })
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });// be sure to include its associated Product data
      } else {
        res.json(tag);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });
  
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tag => {
    res.status(201).json(tag);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then(updatedTag => {
    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(deletedTag => {
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted successfully' });
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
