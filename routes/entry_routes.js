import { Router } from 'express'
import { EntryModel, CategoryModel } from '../db.js'


const router = Router()


router.get('/', async (req, res) => res.send( await EntryModel.find().populate({ path: 'category', select: '-_id name'}))) //path sets the name of the foreign key field
//when using await, async must be specified
//remember, 'find' returns all fitting the parameter specified, and will always return an array regardless of how many items are found.
// find() is one of many query methods that acts on an object, however find() also returns an object (or an array of objects), upon which more query methods can be called

router.get('/:id', async (req, res) => {
  try {
  const entry = await EntryModel.findById(req.params.id).populate({ path: 'category', select: '-_id name'}) // remember, .params sends thruogh all parameters, 
  if (entry) {
    res.send(entry)
  } else {
    res.status(404).send({ error: 'Entry not found' })
  }
}
catch (err) {
  res.status(500).send({ error: err.message })
}
})

router.post('/', async (req, res) => {
  try {
    const theCat = await CategoryModel.findOne({ name: req.body.category }) //retrieve category first
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat._id }) //here we specify the model that is created, and pass in the req.body, which contains the data fo rthe new entry. but because its promise based, we use 'await' and make the callback above 'async'
      res.status(201).send(insertedEntry)
    } else {
      res.status(400).send({ error: 'Category not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// router.put('/:id', async (req, res) => {
//   try {
//     const entry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
//   if (entry) {
//     res.send(entry)
//   } else {
//     res.status(404).send({ error: 'Entry not found' })
//   }

//   }
//   catch (err) {
//     res.status(500).send({ error: err.message })
//   }
// })

router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.content) {
      updatedEntry.content = req.body.content
    }
    if (req.body.category) {
      const theCat = await CategoryModel.findOne({ name: req.body.category })
      if (theCat) {
        updatedEntry.category = theCat._id
      } else {
        res.status(400).send({ error: 'Category not found' })
      }
    }
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, updatedEntry, { new: true })
    if (entry) {
      res.send(entry)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    if (entry) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router