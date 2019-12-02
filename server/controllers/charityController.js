
const charityController = {};
const fetch = require('node-fetch');

charityController.fetchData = (req, res, next) => {
  const { preferences } = req.body;
  const fundraisingOrgs = preferences.fundraisingOrgs || false;
  const state = preferences.state || 'CA';
  let { ids } = preferences;
  const searchNumber = preferences.searchNumber || 1;

  const arrayOfPromises = ids.map(id => {
    return new Promise(function (resolve, reject) {
      fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_ID}&app_key=${process.env.CHARITY_KEY}&rated=true&fundraisingOrgs=${fundraisingOrgs}&sort=RATING:DESC&pageSize=${searchNumber}&categoryID=${id}&state=${state}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          const result = data.map(object => {
            return {
              name: object.charityName,
              mission: object.mission,
              url: object.websiteURL,
              tagLine: object.tagLine,
              score: object.currentRating.score,
              stars: object.currentRating.ratingImage.large,
              categoryName: object.category.categoryName,
              location: object.mailingAddress.stateOrProvince
            }
          })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
  Promise.all(arrayOfPromises)
    .then(data => {
      res.locals.data = data;
      return next();
    })
    .catch(err => {
      return next(err);
    })
}
module.exports = charityController;