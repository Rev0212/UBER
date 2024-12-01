const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minlength:[3,'Firstname must be atleat 3 char long']
        },
        lastname:{
            type:String,
            minlength:[3,'Lastname must be atleat 3 char long']
        },
    },
    email:{
            type:String,
            required:true,
            unique:true,
            minlength:[5,'Email must be atlast 5 char long']
    },
    password:{
            type:String,
            required:true,
            select:false
    },
    socketID:{
            type:String
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleat 3 char long']
        },
        plate:{
            type:String,
            requried:true,
            minlength:[6,'Plate Number must be atleat 6 char long']
        },
        capacity:{
            type:String,
            min:[1,'Capacity must be atleat one'],
            required:true,
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
        },
        location:{
            ltd:{
                type:Number,
            },
            lng:{
                type:Number
            }
        }

    }


})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashedPassword = async function(password) {
    return await bcrypt.hash(password,10)
    
}

const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel;