require('dotenv').config()
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const charityController = require('./controllers/charityController');
const sessionController = require('./controllers/sessionController');
const authController = require('./controllers/authController');
const donationController = require('./controllers/donationController');
const redisController = require('./controllers/redisController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/assets/index.html'));
});
app.post('/checkCookie', sessionController.verifySSID, redisController.getData, donationController.getDonations, (req, res) => {
  const { username, isLoggedIn, donated, reply } = res.locals;
  let data;
  if (isLoggedIn) {
    data = { isLoggedIn, username, donated, reply };
  } else {
    data = { isLoggedIn };
  }
  return res.status(200).json(data);
});

app.delete('/logout', sessionController.deleteSSID, (req, res) => {
  const { isLoggedIn } = res.locals;
  return res.status(200).json({ isLoggedIn })
})
app.delete('/charity', donationController.deleteDonation, (req, res) => {
  return res.json(res.locals.deleted);
})

app.post('/interests', redisController.setData, (req, res) => {
  return res.json(true)
})
app.use('/build', express.static(path.join(__dirname, 'build')));

app.post('/signup', authController.createUser, (req, res) => {
  const { isLoggedIn, username } = res.locals;
  return res.status(200).json({ isLoggedIn, username });
});

app.post('/login', authController.verifyUser, sessionController.setSSID, redisController.getData, donationController.getDonations, (req, res) => {
  const { isLoggedIn, username, reply, donated } = res.locals;
  return res.status(200).json({ isLoggedIn, username, reply, donated });
});

app.post('/api/fetchData', charityController.fetchData, (req, res) => {
  return res.json(res.locals.data);
});

app.post('/donation', donationController.postDonation, (req, res) => {
  return res.status(200).json({ success: res.locals.success });
});
app.put('/updateDonation', donationController.updateDonation, (req, res) => {
  console.log(req.body)
  return res.json(res.locals.updated)
})

/*
Catch all routes that do not exist
**/

app.use('*', (req, res) => {
  return res.sendStatus(404);
})


function errorHandler(err, req, res, next) {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultError, ...err };
  console.log('error:', err);
  res.json({
    status: errorObj.status,
    message: errorObj.message,
  });
}
/*
Global error handler
**/
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
