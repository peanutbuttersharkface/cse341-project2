const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;


const getAllBooks = (req, res) => {
     //#swagger.tags=['Books']
    mongodb
    .getDatabase()
    .db()
    .collection('Books')
    .find()
    .toArray((err, lists) =>{
     if(err){
         res.status(400).json({message:err});
     }
     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(lists);
    });
 };

 const getSingleBook = (req, res) => {
     //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);

    mongodb
   .getDatabase()
   .db()
   .collection('Movies')
   .find({_id: bookId})
   .toArray((err, result) =>{
    if(err){
        res.status(400).json({message:err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
   });
};

const createBook = async(req, res) => {
     //#swagger.tags=['Books']
    const book = {
        Title: req.body.Title,
        Author: req.body.Author,
        DatePublished: req.body.DatePublished,
        DateReceived: req.body.DateReceived,
        Cost: req.body.Cost,
        ISBN: req.body.ISBN,
        NumberOfCopies: req.body.NumberOfCopies,
        Category: req.body.Category
    };
    const response = await mongodb.getDatabase().db().collection('Books').insertOne(book);
    if (response.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

const updateBook = async(req, res) => {
    //#swagger.tags=['Books']
    //if (!ObjectId.isValid(req.params.id)) {
      //  res.status(400).json('Must use a valid contact id to update a contact.');
    //}else{
    const bookId = new ObjectId(req.params.id);
    const book = {
        Title: req.body.Title,
        Author: req.body.Author,
        DatePublished: req.body.DatePublished,
        DateReceived: req.body.DateReceived,
        Cost: req.body.Cost,
        ISBN: req.body.ISBN,
        NumberOfCopies: req.body.NumberOfCopies,
        Category: req.body.Category
    };
// collection is the name of the collection that you have the json file in Mongodb
    const response = await mongodb.getDatabase().db().collection('Books').replaceOne({ _id:bookId }, book);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};  

const deleteBook = async(req, res)=> {
     //#swagger.tags=['Books']
   // if (!ObjectId.isValid(req.params.id)) {
    //    res.status(400).json('Must use a valid contact id to delete a contact.');
   // }else{
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Books').deleteOne({_id:bookId});
    if(response.deleteCount > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the book.');
    }
};


module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};