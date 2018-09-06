const express = require('express');
const bodyParser = require('body-parser');
const cowsay = require('cowsay');

const app = express();
const server = require('http').createServer(app);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

const generateCowsay = (req, res) => {
  const text = req.body.text;
  const cowSpeak = cowsay.think({
    text
  });
  const data = {
    response_type: 'in_channel',
    text: `\`\`\`${cowSpeak}\`\`\``
  };
  res.json(data);
}

router.post('/api/cowsay', generateCowsay);

app.use('/', router);

app.set('port', PORT);
server.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
