const prisma = require("../prismaClient");


exports.sendRequest = async (req, res,next) => {
  try {
    const { skillId } = req.body;

    const skill = await prisma.skill.findUnique({
      where: { id: skillId }
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.userId === req.userId) {
      return res.status(400).json({ message: "You cannot request your own skill" });
    }

    const request = await prisma.request.create({
      data: {
        skillId,
        requesterId: req.userId,
        status: "pending"
      }
    });

    res.status(201).json({
      message: "Request sent",
      request
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getMyRequests = async (req, res,next) => {
  try {
    const requests = await prisma.request.findMany({
      where: { requesterId: req.userId },
      include: {
        skill: true
      }
    });

    res.json(requests);

  } catch (error) {
    console.error(error);
   next(error).json({ message: "Something went wrong" });
  }
};

exports.getRequestsForMe = async (req, res,next) => {
  try {
    const requests = await prisma.request.findMany({
      where: {
        skill: {
          userId: req.userId
        }
      },
      include: {
        requester: true,
        skill: true
      }
    });

    res.json(requests);

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateRequestStatus = async (req, res,next) => {
  try {
    const { requestId, status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { skill: true }
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.skill.userId !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await prisma.request.update({
      where: { id: requestId },
      data: { status }
    });

    res.json({
      message: `Request ${status}`,
      request: updated
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.completeRequest = async (req, res,next) => {
  try {
    const { requestId } = req.body;

    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { skill: true }
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "accepted") {
      return res.status(400).json({ message: "Only accepted requests can be completed" });
    }

    if (
      request.requesterId !== req.userId &&
      request.skill.userId !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await prisma.request.update({
      where: { id: requestId },
      data: { status: "completed" }
    });

    res.json({
      message: "Request marked as completed",
      request: updated
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};