const prisma = require("../prismaClient");

exports.sendMessage = async (req, res,next) => {
  try {
    const { requestId, content } = req.body;

    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { skill: true }
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only requester or skill owner can chat
    if (
      request.requesterId !== req.userId &&
      request.skill.userId !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        requestId,
        senderId: req.userId
      }
    });

    res.status(201).json({
      message: "Message sent",
      messageData: message
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getMessages = async (req, res,next) => {
  try {
    const requestId = parseInt(req.params.requestId);

    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { skill: true }
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (
      request.requesterId !== req.userId &&
      request.skill.userId !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const messages = await prisma.message.findMany({
      where: { requestId },
      orderBy: { createdAt: "asc" }
    });

    res.json(messages);

  } catch (error) {
    console.error(error);
    next(error);
  }
};