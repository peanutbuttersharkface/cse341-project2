
const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;



const getAllMags = async(req, res) => {
    //#swagger.tags=['Magazines']

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('Magazines')
    .find()
    result.toArray().then((Magazines, err)=>{
        try{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Magazines);
            } catch(err) {
            res.status(500).json({message: 'List of magazines was not able to be retrieved.'});
}
});
};
  

  const getSingleMag = async (req, res) => {
     //#swagger.tags=['Magazines']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid magazine id to find a magazine.');
    }else{
    const magId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Magazines').find({_id:magId});
    result.toArray().then((Magazines) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Magazines[0]);
    });
  }};



const createMag = async(req, res) => {
     //#swagger.tags=['Magazines']
    const magazine = {
        Title: req.body.Title,
        Week: req.body.Week,
        NumberOfCopies: req.body.NumberOfCopies,
        Category: req.body.Category
    };
    const response = await mongodb.getDatabase().db().collection('Magazines').insertOne(magazine);
    if (response.acknowledged){
        res.status(204).json(response);
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the magazine.');
    }
};

const updateMag = async(req, res) => {
    //#swagger.tags=['Magazines']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid magazine id to update a magazine.');
    }else{
    const magId = new ObjectId(req.params.id);
    const magazine = {
        Title: req.body.Title,
        Week: req.body.Week,
        NumberOfCopies: req.body.NumberOfCopies,
        Category: req.body.Category
    };
// collection is the name of the collection that you have the json file in Mongodb
   const response = await mongodb
    .getDatabase()
    .db()
    .collection('Magazines')
    .replaceOne({ _id: magId }, magazine);
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the magazines.');
    }
  }};  

const deleteMag = async (req, res)=> {
     //#swagger.tags=['Magazines']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid magazine id to delete a magazine.');
    }else{
    const magId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Magazines').deleteOne({_id:magId});
    if(response.deleteCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the magazine.');
    }
}};


module.exports = {
    getAllMags,
    getSingleMag,
    createMag,
    updateMag,
    deleteMag
};