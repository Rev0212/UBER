const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
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
    }

    }
)

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashedPassword = async function(password) {
    return await bcrypt.hash(password,10)
    
}


const userModel = mongoose.model('user',userSchema);

 module.exports = userModel;