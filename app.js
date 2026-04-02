const express=require("express");
const app=express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");

main()
.then(()=> {
    console.log("connected to database");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotel_booking');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is running");
});

app.get("/testListing" ,async (req,res)=> {
    let SampleListing= new Listing({
    title:"Hotel California",
    description:"A lovely place",
    price:100,
    location:"California",
    country:"USA"
    });
    await SampleListing.save();
    res.send("Listing saved to database");
})

app.get("/listings",async(req,res)=> {
  let listings=await Listing.find({});
  res.render("index.ejs",{listings:listings});
})

app.get("/listings/:id",async(req,res)=> {
  let listing=await Listing.findById(req.params.id);
  res.render("show.ejs",{listing:listing});
})

const port=3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});