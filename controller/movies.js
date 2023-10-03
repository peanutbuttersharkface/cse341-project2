const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async(req, res) => {
    //#swagger.tags=['Movies']
    try{
        const result = await mongodb
          .getDatabase()
          .db()
          .collection('Movies')
          .find()
          .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } catch(err) {
          res.status(500).json({message: 'List of movies was not able to be retrieved.'})
      }
      };
  const getSingleMovie = async(req, res) => {
     //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to find a movie.');
    }else{
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Movies').find({_id:movieId});
    result.toArray().then((Movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Movies[0]);
    });
  }};



const createMovie = async(req, res) => {
     //#swagger.tags=['Movies']
     const movie = {
        Name: req.body.Name,
        YearReleased: req.body.YearReleased,
        DateReceived: req.body.DateReceived,
        Category: req.body.Category,
        Actor: req.body.Actor,
        Actress: req.body.Actress,
        NumberOfCopies: req.body.NumberOfCopies
        
    };
    const response = await mongodb.getDatabase().db().collection('Movies').insertOne(movie);
    if (response.acknowledged){
        res.status(201).json(response);
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
};

const updateMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to update a movie.');
    }else{
    const movieId = new ObjectId(req.params.id);
    const movie = {
        Name: req.body.Name,
        YearReleased: req.body.YearReleased,
        DateReceived: req.body.DateReceived,
        Category: req.body.Category,
        Actor: req.body.Actor,
        Actress: req.body.Actress,
        NumberOfCopies: req.body.NumberOfCopies
        
    };
// collection is the name of the collection that you have the json file in Mongodb
   const response = await mongodb
    .getDatabase()
    .db()
    .collection('Movies')
    .replaceOne({ _id: movieId }, movie);
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
  }};  

const deleteMovie = async(req, res)=> {
     //#swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to delete a movie.');
    }else{
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Movies').deleteOne({_id:movieId});
    if(response.deleteCount > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the movie.');
    }
}};


module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    deleteMovie
};