// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

/*  This is a sample API route. */

const validResources = ['message'];

router.get('/:resource', (req, res) => {
  const { resource } = req.params;
  const { query } = req;

  if (validResources.indexOf(resource) < 0) {
    res.json({
      confirmation: 'fail',
      message: 'No such resource'
    });
    return;
  }

  turbo
    .fetch(resource, query)
    .then(data => {
      res.json({
        confirmation: 'success',
        data: data
      });
      return;
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      });
      return;
    });
});

router.get('/message/me', (req, res) => {
  const resource = 'message';
  const { query } = req;

  const messages = [];
  const first = {
    toUser: query.toUser,
    fromUser: query.fromUser
  };
  const second = {
    fromUser: query.toUser,
    toUser: query.fromUser
  };

  turbo
    .fetch(resource, first)
      data.forEach((mess, i) => {
        messages.push(mess);
      });
      return turbo.fetch(resource, second);
    })
    .then((data, i) => {
      data.forEach((mess, i) => {
        messages.push(mess);
      });
      res.json({
        confirmation: 'success',
        data: messages
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      });
      return;
    });
});

// router.get('/:resource/:id', (req, res) => {
//   res.json({
//     confirmation: 'success',
//     resource: req.params.resource,
//     id: req.params.id,
//     query: req.query // from the url query string
//   });
// });

module.exports = router;
