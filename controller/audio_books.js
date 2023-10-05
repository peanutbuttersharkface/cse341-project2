
const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;



const getAllAudio = async(req, res) => {
    //#swagger.tags=['Audio_Books']

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('Audio_Books')
    .find()
    result.toArray().then((Audio_Books, err)=>{
        try{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Audio_Books);
            } catch(err) {
            res.status(500).json({message: 'List of audio books was not able to be retrieved.'});
}
});
};
  

  const getSingleAudio = async (req, res) => {
     //#swagger.tags=[Audio_Books']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid audio book id to find a book.');
    }else{
    const audioId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Audio_Books').find({_id:audioId});
    result.toArray().then((Audio_Books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Audio_Books[0]);
    });
  }};



const createAudio = async(req, res) => {
     //#swagger.tags=['Audio_Books']
    const audio = {
        Title: req.body.Title,
        Author: req.body.Author,
        DatePublished: req.body.DatePublished,
        DateReceived: req.body.DateReceived,
        Cost: req.body.Cost,
        ISBN: req.body.ISBN,
        NumberOfCopies: req.body.NumberOfCopies,
        Category: req.body.Category
    };
    const response = await mongodb.getDatabase().db().collection('Audio_Books').insertOne(audio);
    if (response.acknowledged){
        res.status(204).json(response);
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the audio book.');
    }
};

const updateAudio = async(req, res) => {
    //#swagger.tags=['Audio_Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid audio book id to update a audio book.');
    }else{
    const audioId = new ObjectId(req.params.id);
    const audio = {
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
    .collection('Audio_Books')
    .replaceOne({ _id: audioId }, audio);
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the audio books.');
    }
  }};  

const deleteAudio = async (req, res)=> {
     //#swagger.tags=['Audio_Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid audio audio book id to delete a audio book.');
    }else{
    const audioId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Audio_Books').deleteOne({_id:audioId});
    if(response.deleteCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the audio book.');
    }
}};


module.exports = {
    getAllAudio,
    getSingleAudio,
    createAudio,
    updateAudio,
    deleteAudio
};