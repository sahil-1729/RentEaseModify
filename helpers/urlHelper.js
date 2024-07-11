const getFullImageUrl = (req, filePath) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/${filePath.replace(/public\\/g, '')}`;
};

const addTheUrl = (req, properties) => {
  properties.forEach(property => {
    if (property.images && Array.isArray(property.images)) {
      property.images = property.images.map(image => ({
        ...image,
        fileName: getFullImageUrl(req, image.fileName)
      }));
    }
  });
  return properties;
};

module.exports = {
  getFullImageUrl,
  addTheUrl
};
