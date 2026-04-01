const mongoose = require('mongoose');
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(()=> {
    console.log("connected to database");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotel_booking');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initData= async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
}
initData();