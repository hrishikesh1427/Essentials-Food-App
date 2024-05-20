// const mongoose = require('mongoose')
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = 'mongodb+srv://hrishikeshvastrad14:Password#1@cluster0.yipmzlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function (callback) {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food_items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Categories");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     callback(err, data, Catdata);

//                 })
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };

const mongoose = require('mongoose');

// Set strictQuery to false to avoid deprecation warning
mongoose.set('strictQuery', false);

// URL-encoded MongoDB URI
const mongoURI = 'mongodb+srv://hrishikeshvastrad14:Password%231@cluster0.yipmzlh.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = (callback) => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to MongoDB");
      try {
        const foodCollection = await mongoose.connection.db.collection("food_items");
        const foodItems = await foodCollection.find({}).toArray();
        const categoryCollection = await mongoose.connection.db.collection("foodCategory");
        const categories = await categoryCollection.find({}).toArray();
        callback(null, foodItems, categories);
      } catch (error) {
        callback(error);
      }
    })
    .catch(err => {
      console.log("--- " + err);
      callback(err);
    });
};

module.exports = connectToMongoDB;
