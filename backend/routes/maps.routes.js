const express = require('express')
const router = express.Router()
const {query} =  require('express-validator')
const mapController = require('../controllers/map.controllers')
const authMiddleware = require('../middlewares/auth.middleware') 




router.get(
    '/get-coordinate',
    [
        query('address', 'Address is required').notEmpty().isString().isLength({ min: 3 }),
        authMiddleware.authUser
    ],
    mapController.getCoordinates 
);

router.get('/get-distance',
    [
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    ],
    mapController.getDistance
)

router.get('/get-place',
    [
        query('place').isString(),
        authMiddleware.authUser
    ],
    mapController.getAutoComplete

)


module.exports = router;