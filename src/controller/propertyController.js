const PropertyRepository = require("../repository/propertyRepository");
const propertyRepo = new PropertyRepository();

const getProperties = async (req, res) => {
  try {
    const properties = await propertyRepo.getProperties();
    res.send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getPropertyByPropertyId = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyRepo.getPropertyByPropertyId(id);
    res.send(property);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getPropertyByUserPhoneNumber = async (req, res) => {
  try {
    const contactNo = req.params.contactNo;
    console.log(contactNo)
    const properties = await propertyRepo.getPropertyByUserPhoneNumber(contactNo);
    res.send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const createProperty=async (req,res)=>{
  try{

  }catch(err){
    console.log(err)
    res.status(500).send("Internal server error")
  }
}

const updateProperty=async (req,res)=>{
  try{

  }catch(err){
    console.log(err)
    res.status(500).send("Internal server error")
  }
}

const deleteProperty=async (req,res)=>{
  try{

  }catch(err){
    console.log(err)
    res.status(500).send("Internal server error")
  }
}


module.exports = {
  getProperties,
  getPropertyByPropertyId,
  getPropertyByUserPhoneNumber,
  createProperty,
  updateProperty,
  deleteProperty
};
