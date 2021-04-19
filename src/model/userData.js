const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://usertwo:usertwo@cluster0.jqohk.mongodb.net/assignment?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://localhost:27017/Users',{useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:String,
    email:String,
    phnumber:String,
    dob:String
});


var UserData = mongoose.model('userdata',UserSchema);

module.exports = UserData;