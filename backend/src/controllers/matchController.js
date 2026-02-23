const prisma = require("../prismaClient");

exports.findMatches = async (req, res,next) => {
  try {
    const mySkills = await prisma.skill.findMany({
      where: { userId: req.userId }
    });

    const myWanted = await prisma.wantedSkill.findMany({
      where: { userId: req.userId }
    });

    const matches = [];

    for (let skill of mySkills) {
      for (let wanted of myWanted) {

        const usersWhoWantMySkill = await prisma.wantedSkill.findMany({
          where: {
            title: skill.title,
            userId: { not: req.userId }
          },
          include: { user: true }
        });

        const usersWhoHaveWhatIWant = await prisma.skill.findMany({
          where: {
            title: wanted.title,
            userId: { not: req.userId }
          },
          include: { user: true }
        });

        usersWhoWantMySkill.forEach(userWanted => {
          usersWhoHaveWhatIWant.forEach(userHave => {
            if (userWanted.userId === userHave.userId) {
              matches.push(userHave.user);
            }
          });
        });
      }
    }

    res.json(matches);

  } catch (error) {
    console.error(error);
    next(error);
  }
};