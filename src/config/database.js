const mongoose=require("mongoose")
const DBURL=process.env.DBURL
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});

module.exports=db