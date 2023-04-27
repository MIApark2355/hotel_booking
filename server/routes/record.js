const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 


/////////////////////// USER SECTION /////////////////////////////////////////

// LOG IN
recordRoutes.route("/users/login").post(function (req, res) {
let queryres;
 let db_connect = dbo.getDb();
 let myquery = {name: req.body.username["username"], password: req.body.password["password"]};
 db_connect
   .collection("users")
   .findOne(myquery, function (err, result){
    if (err){
      console.log(err);
    }
    if(result){ // user found
      console.log(result);
      console.log("User found");
      queryres = {success: true}
    }else {
      console.log(result);
      console.log("User not found");
      queryres = {success: false}
    }
    res.json(queryres);
   });
  //  .toArray(function (err, result) {
  //    if (err) throw err;
  //    res.json(result);
  //  });
});

// REGISTER
recordRoutes.route("/users/add").post(function (req, res) {
  let queryres;
 let db_connect = dbo.getDb();
 let myquery = {name: req.body.name} // must have unique username, but same password is allowed
 db_connect
   .collection("users")
   .findOne(myquery, function (err, result){
    if (err){
      console.log(err);
    }
    if(result){ // user found
      queryres = {success: false}; // already registered
      alert("username already exists");
    }else {
      
      myquery = {name: req.body.name, password: req.body.password}
      db_connect
        .collection("users")
        .insertOne(myquery, function (err, result){
          if (err) throw err;
          console.log("User added");
          res.json(result);
        });
    
   };
  //  .toArray(function (err, result) {
  //    if (err) throw err;
  //    res.json(result);
  //  });
  });
});

///////////////////// HOTEL SECTION ////////////////////////////////////

//GET ALL AVAILABLE HOTELS FOR DISPLAY
recordRoutes.route("/hotels").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("hotels")
   .find({availability: {$gt: 0}}) // only display hotels greater than 0
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
//FILTERED HOTELS
recordRoutes.route("/hotels/filter").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myObj = {price: {$lte: req.body.price},
                 location: req.body.location,
                  availability: {$gte: req.body.people},
                ratings: {$gte: req.body.ratings}};
    console.log(myObj);
    db_connect.collection("hotels")
    .find(myObj)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("Hotels returned");
      console.log(result);
      res.json(result);
    });;
});
 
///////////////////// RESERVATION SECTION ////////////////////////////////////


// SHOW ALL RESERVATIONS OF USER
recordRoutes.route("/reservations").post(function (req, res) {
  let db_connect = dbo.getDb();
  
  db_connect
    .collection("reservations")
    .find({name: req.body.name["username"]})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("trying to get booking list");
      res.json(result);
    });
 });

// BOOK A HOTEL (allow multiple bookings)
recordRoutes.route("/reservations/book").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {name: req.body.username, 
    hotel: req.body.hotel, 
    people: req.body.people, 
    movein: req.body.movein, 
    moveout: req.body.moveout,
    ratings: null
  };
  let myquery1 = {hotel: req.body.hotel};
  db_connect
    .collection("hotels") // adjust availability
    .updateOne(myquery1, {$inc:{ availability: -req.body.people}},function (err, result){
      if (err) throw err;
    });
  db_connect
    .collection("reservations") // add reservation
    .insertOne(myquery, function (err, result){
      if (err) throw err;
      console.log("1 document added");
      response.json(result);
    });
});

// CANCEL RESERVATION

recordRoutes.route("/reservations/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = {_id: ObjectId(req.params.id)};
  console.log(myquery);
  // let myquery1 = {hotel: req.body.hotel};
  // let num = Number(req.body.people);
  // db_connect
  //   .collection("hotels") // adjust availability
  //   .updateOne(myquery1, {availability: {$inc:Number(req.body.people)}},function (err, result){
  //     if (err) throw err;
  //   });
  db_connect.collection("reservations").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log(obj);
    console.log("1 document deleted from booked list");
    response.json(obj);
  });
 });



 // must pass id back
 // This section will help you get a single record by id
recordRoutes.route("/reservations/search/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("reservations")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// EDIT RESERVATION (CREATIVE PORTION)
 recordRoutes.route("/reservations/edit/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  
  let myquery = {_id: ObjectId(req.params.id)};
  console.log(myquery);
  //retreive dynamic parameter by req.params.{id}
  let newvalues = {
    $set: {
      people: req.body.people, 
      movein: req.body.movein, 
      moveout: req.body.moveout,
      ratings: req.body.ratings
    },
  };
  db_connect
    .collection("reservations")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 reservation updated");
      //response.json(res);
      
    });

    db_connect
    .collection("hotels")
    .updateOne({name: req.body.hotel}, {$set: {ratings: req.body.ratings}}, function (err, res) {
      if (err) throw err;
      console.log("1 hotel updated");
      //response.json(res);
      
    });
    
    


// This section will help you update a record by id.
// put : in front of dynamic parameter

 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
});


////////////////////SavedHotels////////////////
// SHOW ALL SAVED LISTS OF USER

recordRoutes.route("/savedlist").post(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("saved")
    .find({name: req.body.name["username"]})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("trying to get saved list");
      res.json(result);
    });
    //console.log (req.body.name["username"]);
 });

 // CANCEL FROM SAVED LIST

  // Save A HOTEL (allow multiple bookings)
recordRoutes.route("/savedlist/save").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {
    name: req.body.username, 
    hotel: req.body.hotel, 
    location: req.body.location, 
    price: req.body.price,
  };


  console.log("trying to save:" ,myquery);

  db_connect
    .collection("saved") // add reservation
    .insertOne(myquery, function (err, result){
      if (err) throw err;
      console.log("1 document added in saved list");
      response.json(result);
    });
});


recordRoutes.route("/savedlist/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = {_id: ObjectId(req.params.id)};
  console.log(myquery);
  // let myquery1 = {hotel: req.body.hotel};
  // let num = Number(req.body.people);
  // db_connect
  //   .collection("hotels") // adjust availability
  //   .updateOne(myquery1, {availability: {$inc:Number(req.body.people)}},function (err, result){
  //     if (err) throw err;
  //   });
  db_connect.collection("saved").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log(obj);
    console.log("1 document deleted from saved list");
    response.json(obj);
  });
 });


 

module.exports = recordRoutes; // MUST1