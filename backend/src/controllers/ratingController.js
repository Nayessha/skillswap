const prisma = require("../prismaClient");

exports.rateUser = async (req, res,next) => {
  try {
    const { userId, value } = req.body;

    if (value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (userId === req.userId) {
      return res.status(400).json({ message: "You cannot rate yourself" });
    }

    const existing = await prisma.rating.findFirst({
      where: {
        reviewerId: req.userId,
        userId
      }
    });

    if (existing) {
      return res.status(400).json({ message: "Already rated this user" });
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