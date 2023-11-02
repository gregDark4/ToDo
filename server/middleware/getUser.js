const { Player } = require('../db/models');
async function getUser(req, res, next) {
  if (req.session.user_id) {
    const user = await Player.findOne({
      where: { id: req.session.user_id },
      attributes: { exclude: ['password'] },
    });
    res.locals.user = user;
  }
  next();
}

module.exports = getUser;
