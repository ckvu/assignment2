const mongoose = require('mongoose');

// Connection URL
const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-neow1.mongodb.net/messageBoard?retryWrites=true&w=majority';

// Database Name

// Create a new MongoClient
mongoose
  .connect(uri, { useNewUrlParser: true })
  .catch(error => {
    console.error('Connection error', error.message);
  });

// Use connect method to connect to the Server
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database is connected!');
});

module.exports = db;
