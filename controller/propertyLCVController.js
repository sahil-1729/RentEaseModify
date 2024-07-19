const likeProperty = async (req, res) => {
  try {
    const propertyLCVRepo = req.propertyLCVRepo;
    await propertyLCVRepo.likeProperty();
    res.status(200).json({ message: "You liked the property" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getComments = async (req, res) => {
  try {
    const propertyLCVRepo = req.propertyLCVRepo;
    const comments = await propertyLCVRepo.getComments();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const propertyLCVRepo = req.propertyLCVRepo;
    await propertyLCVRepo.createComment(comment);
    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { oldComment, newComment } = req.body;
    const propertyLCVRepo = req.propertyLCVRepo;
    await propertyLCVRepo.updateComment(oldComment, newComment);
    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const propertyLCVRepo = req.propertyLCVRepo;
    await propertyLCVRepo.deleteComment(comment);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewProperty = async (req, res) => {
  try {
    const propertyLCVRepo = req.propertyLCVRepo;
    await propertyLCVRepo.viewProperty();
    res.status(200).json({ message: "You viewed this property" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  likeProperty,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  viewProperty,
};
