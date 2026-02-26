const prisma = require("../prismaClient");

exports.addRating = async (req, res, next) => {
  try {
    const { userId, value } = req.body;

    if (value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be 1 to 5" });
    }

    const rating = await prisma.rating.create({
      data: {
        value,
        reviewerId: req.userId,
        userId
      }
    });

    res.status(201).json({
      message: "Rating submitted",
      rating
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};