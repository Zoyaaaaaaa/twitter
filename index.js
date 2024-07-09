const express = require('express');
const bodyParser = require('body-parser');
const Twitter = require('twitter-lite');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const client = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: "askdHbxZxvTL9JSQJOZlRkkQs", // from Twitter.
  consumer_secret: "7qPl3VbbuuLh84cTqUbTnH0ezhjH2s7UEgRfuAK5epHrbWTOA5", // from Twitter.
  access_token_key: "1737007675391504384-odVgBv7vSIYTwhMHffNXDaJjnMeco7", // from your User (oauth_token).
  access_token_secret: "OuftMVhUkxQHBSF7m37OQOeymnjGTciMOJsUr54ogxYFt" // from your User (oauth_token_secret).
});

app.post('/uploadProduct', async (req, res) => {
  const { productDetails } = req.body;

  try {
    // Post tweet with image URL and caption
    const tweet = await client.post("statuses/update", {
      status: `${productDetails.caption} ${productDetails.imageUrl}`
    });

    res.json({ success: true, tweet });
  } catch (error) {
    console.error('Error posting tweet:', error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
