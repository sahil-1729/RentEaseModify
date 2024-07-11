// helpers/filterUser.js

/**
 * Filters out sensitive fields from the user object.
 * @param {Object} user - The user object.
 * @returns {Object} - The filtered user object.
 */
const filterUser = (user) => {
  if (user && user.toObject) {
    user = user.toObject();
  }
  const { password, isAdmin, ...filteredUser } = user;
  return filteredUser;
};

module.exports = filterUser;
