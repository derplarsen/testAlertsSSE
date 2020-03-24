const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3344
const SSE = require('express-sse');
const sse = new SSE();

app.use(cors());
app.use(bodyParser.text());
app.use(express.static('.'))
app.get('/stream', cors(), sse.init);
app.post('/receiveData', (req,res) => {
  const payload = req.body;
  console.log('req.body: ', req.body)
  sse.send(payload);
  res.json(payload);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
