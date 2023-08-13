import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

// remember, 'Journal' is the database, 'categories' is the 'collection'
mongoose.connect(process.env.ATLAS_DB_URL)
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))



  //Entry Schema
//in the schema we specify the fields of a model, what data types each field can take, if its required, if there is a default etc.  
const entrySchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true }
})


// Entry Model
//a new model must be created with the schema specified
const EntryModel = mongoose.model('Entry', entrySchema)


//Category Schema
const categorySchema =  new mongoose.Schema({
  name: { type: String, required: true},
  // entries: [entrySchema] //embedding entrySchema as a sub-document of the categories Schema, this makes it a one to many relationship. it also means we dont need an entire 'entries' collection

  //a reference can be thought of as a foreign key, and can be done instead of embedding it, can be seen in entrySchema
})

//Category Model
const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }



//embedding testing
// CategoryModel.create({
//   name: 'foo',
//   entries: [ //as seen here, we can create sub-documents (entries) directly while creating the Category
//     {content: 'Bar'},
//     {content: 'Bat'}
//   ]
// })

//category ref testing
// async function addEntry() {
// const theCat = await CategoryModel.findOne({ name: 'Coding'}) //retrieve category first
// EntryModel.create({ content: 'Testing category ref', category: theCat._id}) //create an entry in the category based on the id of the category pulled out earlier but
// }
// addEntry()