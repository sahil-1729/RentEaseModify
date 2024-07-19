
const corsOptions = {
  origin: process.env.FRONTENDURL, // Change this to the origin of your frontend application
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Pass cookies, if any
  optionsSuccessStatus: 204,
};

module.exports=corsOptions