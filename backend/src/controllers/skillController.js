const prisma = require("../prismaClient");

exports.addSkill = async (req, res,next) => {
  try {
    const { title, category } = req.body;

    const newSkill = await prisma.skill.create({
      data: {
        title,
        category,
        userId: req.userId
      }
    });

    res.status(201).json({
      message: "Skill added successfully",
      skill: newSkill
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getAllSkills = async (req, res,next) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        user: {
          include: {
            ratingsReceived: true
          }
        }
      }
    });

    const result = skills.map(skill => {
      const ratings = skill.user.ratingsReceived;

      const average =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
          : 0;

      return {
        id: skill.id,
        title: skill.title,
        category: skill.category,
        user: {
          id: skill.user.id,
          name: skill.user.name,
          averageRating: Number(average.toFixed(1)),
          totalRatings: ratings.length
        }
      };
    });

    result.sort((a, b) => b.user.averageRating - a.user.averageRating);

    res.json(result);

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addWantedSkill = async (req, res,next) => {
  try {
    const { title, category } = req.body;

    const wanted = await prisma.wantedSkill.create({
      data: {
        title,
        category,
        userId: req.userId
      }
    });

    res.status(201).json({
      message: "Wanted skill added",
      wanted
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getSkillsByCategory = async (req, res,next) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    const grouped = {};

    skills.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });

    res.json(grouped);

  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getMySkills = async (req, res, next) => {
  try {
   const skills = await prisma.skill.findMany({
      where: {
        userId: req.userId,
      },
    });

    res.json(skills);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getMyWantedSkills = async (req, res, next) => {
  try {
    const wanted = await prisma.wantedSkill.findMany({
      where: {
        userId: req.userId
      }
    });

    res.json(wanted);
  } catch (error) {
    next(error);
  }
};
exports.getRecommendedTeachers = async (req, res, next) => {
  try {
    const { title, category } = req.query;

    const teachers = await prisma.skill.findMany({
      where: {
        title: {
          equals: title,
          mode: "insensitive"
        },
        category: {
          equals: category,
          mode: "insensitive"
        }
      },
      include: {
        user: {
          include: {
            ratingsReceived: true
          }
        }
      }
    });

    const formatted = teachers.map(skill => {
      const ratings = skill.user.ratingsReceived;
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
          : 0;

      return {
        skillId: skill.id,
        teacherId: skill.user.id,
        teacherName: skill.user.name,
        averageRating: avgRating
      };
    });

    // Sort by rating descending
    formatted.sort((a, b) => b.averageRating - a.averageRating);

    res.json(formatted);

  } catch (error) {
    console.error(error);
    next(error);
  }
};