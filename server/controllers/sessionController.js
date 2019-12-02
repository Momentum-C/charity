const uuid = require('uuid/v4');
const db = require('../databases/psql');
const { pool } = require('../databases/psql');

const sessionController = {};

sessionController.setSSID = async (req, res, next) => {
  const { username } = res.locals;
  const ssid = uuid();
  const query = {
    text: 'INSERT INTO "Sessions" (ssid, username) VALUES ($1, $2) RETURNING *',
    params: [ssid, username],
  };
  try {
    await db.query(query);
    res.cookie('ssid', ssid, { expires: new Date(Date.now() + Infinity) }, { httpOnly: true });
    res.locals.isLoggedIn = true;
    next();
  } catch (err) {
    next({
      log: `Error: ${err}`,
      status: 500,
      message: 'Server Error',
    })
  }
};


sessionController.verifySSID = (req, res, next) => {
  const { ssid } = req.cookies;
  if (!ssid) {
    return res.json({ isLoggedIn: false });
  }
  pool.query('SELECT * FROM "Sessions" WHERE ssid = $1', [ssid], (err, result) => {
    if (err) {
      return next({
        log: `sessionController.verifySSID: ERROR: ${err}`,
        message: { err: 'sessionController.verifySSID: ERROR: Check server logs for details' },
      });
    }
    if (!result) {
      res.locals.isLoggedIn = false;
      return next();
    }
    const { username } = result.rows[0];
    res.locals.username = username;
    res.locals.isLoggedIn = true;
    return next();
  });
};

sessionController.deleteSSID = async (req, res, next) => {
  const { ssid } = req.cookies;
  if (!ssid) {
    return next({
      log: 'deleteSSID: invalid input',
      message: 'Invalid input',
    });
  }
  const query = {
    text: `DELETE FROM "Sessions" WHERE ssid = $1`,
    params: [ssid],
  };
  try {
    await db.query(query);
    res.clearCookie('ssid');
    res.locals.isLoggedIn = false;
    next();
  } catch (error) {
    next({
      log: `deleteSSID: ${error}`,
      status: 500,
      message: 'Internal error',
    })
  }
}

module.exports = sessionController;