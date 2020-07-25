function CheckAdmin(req, res, next) {
  if (req.body.code == 'admin') {
    next();
  }
  else {
    res.sendStatus(405);
  }
}

module.exports = CheckAdmin;