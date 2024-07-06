const Property = require("../models/property");
class PropertyRepository {
  async getProperties() {
    return await Property.find();
  }

  async getPropertyByPropertyId(id) {
    return await Property.find(id);
  }

  async getPropertyByUserPhoneNumber(contactNo) {
    return await Property.find({
      contactNo: contactNo,
    });
  }

  async createProperty(property) {
    const newProperty = new Property(property);
    return await newProperty.save();
  }

  async updateProperty(id, updateData) {
    return await Property.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProperty(id) {
    return await Property.findByIdAndDelete(id);
  }
}

module.exports=PropertyRepository;