const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const UserData = require('./src/model/userData');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.send('Backend is working');
})
app.get('/users',async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    await UserData.find()
    .then(function(users){
        console.log(users)
        res.send(users);
    });
});
app.post('/addNewUser', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            // Text data from the form
            console.log(req.body);

                var newAddedUser = {};
                newAddedUser.username=req.body.NewUser.username;
                newAddedUser.email=req.body.NewUser.email;
                newAddedUser.phnumber=req.body.NewUser.phnumber;
                newAddedUser.dob=req.body.NewUser.dob;

                var user = UserData(newAddedUser);
                await user.save();

})
app.get('/users/:id',async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.params.id)
    const id = req.params.id;
    await UserData.findOne({_id:id})
    .then(function(user){
        console.log(user);
        if (user==null) {
            return Promise.reject('User not found');
        }
        res.send(user);
    })
    .catch(err=>{res.send(err);})
});
app.delete('/users/:id', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.params.id)
    const id = req.params.id;
    await UserData.deleteOne({_id:id})
    .then(function(err){
        console.log(err);
    })
})
app.put('/users/:id', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.params.id)
    const id = req.params.id;
    console.log(req.body);
    var username = req.body.UserToEdit.username;
    var email = req.body.UserToEdit.email;
    var phnumber = req.body.UserToEdit.phnumber;
    var dob = req.body.UserToEdit.dob;
    await UserData.findOneAndUpdate({_id:id},{$set:{
        username,
        email,
        phnumber,
        dob
    
    }},{new:true})
    .then (function(user){
        console.log(user);
        res.send(user);
    })
})

app.listen(PORT,()=>{console.log('Server at 4000')});