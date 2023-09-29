const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule1 = {
    Title: 'required|string',
    Author: 'required|string',
    DatePublished: 'required|string',
    DateReceived: 'required|string',
    Cost: 'string',
    ISBN: 'required|string',
    NumberOfCopies: 'required|string',
    Category: 'string'
  };
  validator(req.body, validationRule1, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveMovie = (req, res, next) => {
    const validationRule2 = {
      Name: 'required|string',
      YearReleased: 'string',
      DateReceived: 'required|string',
      Category: 'required|string',
      Actor: 'required|string',
      Actress: 'required|string',
      NumberOfCopies: 'required|string'
     
    };
    validator(req.body, validationRule2, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
};
module.exports = {
  saveBook,
  saveMovie
};