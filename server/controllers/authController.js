const { pool } = require('../databases/psql');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const authController = {};

authController.createUser = (req, res, next) => {
  const password = req.body.password;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err || !salt) {
      return next({
        log: `authController.createUser: ERROR: ${err}`,
        message: { err: 'authController.createUser before bcrypt HASH: ERROR: Check server logs for details' },
      });
    }
    bcrypt.hash(password, salt, (err, encryptedPass) => {
      if (err || !encryptedPass) {
        return next({
          log: `authController.createUser: ERROR: ${err}`,
          message: { err: 'authController.createUser: ERROR: Check server logs for details' },
        });
      }
      pool.query('INSERT INTO "Users" (username, password) VALUES ($1, $2) RETURNING *', [req.body.username, encryptedPass])
        .then(result => {
          res.locals.username = result.rows[0].username;
          return next();
        })
        .catch(err => {
          return next({
            log: `authController.createUser failed on insert: ERROR: ${err}`,
            message: { err: 'authController.createUser: ERROR: Check server logs for details' },
          });
        });
    });
  })
};

authController.verifyUser = (req, res, next) => {
  const username = req.body.username;
  pool.query('SELECT * FROM "Users" WHERE username = $1', [username], (err, result) => {
    if (err || !result.rows.length) {
      return next({
        log: `authController.verifyUser: ERROR: ${err}`,
        message: { err: 'authController.verifyUser: ERROR: Check server logs for details' }
      });
    } else {
      bcrypt.compare(req.body.password, result.rows[0].password, (err, isMatch) => {
        if (!isMatch) {
          return next({
            log: `userController.verifyUser: ERROR: ${err}`,
            message: { err: 'authController.verifyUser: ERROR: Check server logs for details' }
          });
        } else {
          res.locals.username = result.rows[0].username;
          console.log(res.locals)
          return next();
        }
      });
    };
  })
};

authController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  return next();
};




module.exports = authController;