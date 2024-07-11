const Property = require("../models/property");
class propertyFilterRepository {
  async getPropertiesBasedOnFilters(filters,sortBy=null){
    const query=Property.find(filters)
    if(sortBy){
        query.sort(sortBy)
    }
    return await query
  }
}

module.exports=propertyFilterRepository