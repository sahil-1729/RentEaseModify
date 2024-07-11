const PropertyRepository = require("../repository/propertyRepository");
const UserRepository = require("../repository/userRepository");
const propertyRepo = new PropertyRepository();
const userRepo = new UserRepository();

class PropertyLCV {
  constructor(email, id, token) {
    this.id = id;
    this.email = email;
    this.token = token; // Token from the cookie
    this.user = null;
    this.property = null;
  }

  async init() {
    const user = await userRepo.getUserByEmail(this.email);
    const property = await propertyRepo.getPropertyByPropertyId(this.id);
    if (!user) {
      throw new Error("User not found");
    } else if (!property) {
      throw new Error("Property not found");
    } else {
      this.property = property;
      this.user = user;
    }
  }

  async likeProperty(name) {
    const propertyLike = this.property.likes.find((like) => like.name === name);
    if (!propertyLike) {
      this.property.likes.push({ name });
      await this.property.save();
    } else {
      throw new Error("You already liked this property");
    }
  }

  async getComments() {
    return this.property.comments;
  }

  async createComment(comment) {
    const name = this.user.firstname + " " + this.user.lastname;
    if (!comment) {
      throw new Error("Please add a comment");
    }
    this.property.comments.push({ name, comment });
    await this.property.save();
  }

  async updateComment(oldComment, newComment) {
    const commentToUpdate = this.property.comments.find(
      (c) =>
        c.comment === oldComment &&
        c.name === this.user.firstname + " " + this.user.lastname
    );
    if (!commentToUpdate) {
      throw new Error("No comment found");
    } else {
      commentToUpdate.comment = newComment;
      await this.property.save();
    }
  }

  async deleteComment(name, comment) {
    const commentIndex = this.property.comments.findIndex(
      (c) => c.comment === comment && name === c.name
    );
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    } else {
      this.property.comments.splice(commentIndex, 1);
      await this.property.save();
    }
  }

  async viewProperty() {
    const hasViewed = this.property.views.find(view => view.token === this.token);
    if (!hasViewed) {
      this.property.views.push({ token: this.token });
      await this.property.save();
    }
    return this.property.views.length;
  }
}

module.exports = PropertyLCV;
