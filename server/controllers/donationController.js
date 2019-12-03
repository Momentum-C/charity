const { pool } = require('../databases/psql');
const donationController = {};

donationController.getDonations = (req, res, next) => {
  pool.query('SELECT * from "Donations" WHERE username=$1', [res.locals.username], (err, result) => {
    if (err) return next({
      log: `donationController.getDonation: ERROR: ${err}`,
      message: { err: 'donationController.getDonation: ERROR: Check server logs for details' }
    })
    res.locals.donated = result.rows;
    return next();
  })
}
donationController.postDonation = (req, res, next) => {
  const { username, amount, charityName } = req.body;
  pool.query('INSERT INTO "Donations" (username, amount, "charityName", date) VALUES ($1, $2, $3, $4)', [username, amount, charityName, new Date()], (err, result) => {
    if (err || !result) {
      res.locals.success = false;
      return next({
        log: `donationController.postDonation: ERROR: ${err}`,
        message: { err: 'donationController.postDonation: ERROR: Check server logs for details' },
      });
    }
    res.locals.success = true;
    return next();
  });
};

donationController.deleteDonation = (req, res, next) => {
  pool.query('DELETE FROM "Donations" WHERE _id=$1 RETURNING *', [req.body._id], (err, result) => {
    if (err) return next({
      log: `donationController.deleteDonation: ERROR: ${err}`,
      message: { err: 'donationController.deleteDonation: ERROR: Check server logs for details' },
    })
    res.locals.deleted = true;
    return next();
  })
}
donationController.updateDonation = (req, res, next) => {
  const { _id, amount, charityName } = req.body.newData
  pool.query('UPDATE "Donations" SET amount=$1, "charityName"=$2, date=$3 WHERE _id=$4', [amount, charityName, new Date(), _id], (err, result) => {
    if (err) return next({
      log: `donationController.updateDonation: ERROR: ${err}`,
      message: { err: 'donationController.updateDonation: ERROR: Check server logs for details' },
    })
    res.locals.updated = true;
    return next();
  });
}

module.exports = donationController;
