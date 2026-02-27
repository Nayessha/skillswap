const prisma = require("../prismaClient");

exports.addRating = async (req, res, next) => {
  try {
    const { userId, value } = req.body;

    const rating = await prisma.rating.create({
      data: {
        userId,
        reviewerId: req.userId,
        value
      }
    });

    res.status(201).json(rating);

  } catch (error) {
    console.error(error);
    next(error);
  }
};