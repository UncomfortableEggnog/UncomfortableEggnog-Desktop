module.exports = function (app, express) {
  app.use(express.static(__dirname + '../../client/'));
  app.get('/', function (req, res) {
    res.sendStatus(200);
  });
};