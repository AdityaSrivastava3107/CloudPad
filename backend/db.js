const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true&tls=false"
const connectToMongo=async()=>{
    await mongoose.connect(mongoURI)
    console.log("Mongoose Connected");
}
module.exports = connectToMongo;