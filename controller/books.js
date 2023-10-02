const { response } = require('express');
const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async(req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb
    .getDatabase()
    .db()
    .collection('Books')
    .find();
    result.toArray().then((Books) => {
        res.setHeader('Content-Type', 'application/json');
        if(response.acknowledged){
          res.status(200).json(Books);
        }else{
          res.status(500).json(response.error || 'Some error occurred while retreiving all books')
        }
    });
};
  const getSingleBook = async (req, res) => {
     //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to find a book.');
    }else{
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Books').find({_id:bookId});
    result.toArray().then((Books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Books[0]);
    });
  }};



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
        res.status(201).json(response);
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

const updateBook = async(req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
    }else{
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
   const response = await mongodb
    .getDatabase()
    .db()
    .collection('Books')
    .replaceOne({ _id: bookId }, book);
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the books.');
    }
  }};  

const deleteBook = async (req, res)=> {
     //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
    }else{
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Books').deleteOne({_id:bookId});
    if(response.deleteCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the book.');
    }
}};


module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};