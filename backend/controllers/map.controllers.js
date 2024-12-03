const mapService = require('../services/maps.service')
const { validationResult} = require('express-validator')



module.exports.getCoordinates = async(req,res,next) =>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {address} = req.query;

    try{
        const coordinates = await mapService.getAddressCoordinate
        (address);
        res.status(200).json(coordinates)
    }catch (error){
        res.status(404).json({message:'Unable to Fetch Coordinates'})
    }
}

module.exports.getDistance = async(req,res,next) =>{

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.calculateDistance(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports.getAutoComplete = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Use 400 for bad requests
      }
  
      const { place } = req.query;
  
      if (!place) {
        return res.status(400).json({ message: 'Place query parameter is required.' });
      }
  
      const suggestions = await mapService.getSuggestions(place);
  
      if (!suggestions) {
        return res.status(404).json({ message: 'No suggestions found.' });
      }
  
      res.status(200).json(suggestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  