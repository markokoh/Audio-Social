const admin = require("firebase-admin");
admin.initializeApp();
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const {Messaging} = require("@signalwire/realtime-api");
const fromNumber = process.env.FROM_NUMBER;

const credentials = {
  project: process.env.PROJECT_ID,
  token: process.env.API_TOKEN,
};


const sendTextMessage = async (body, toNumber, media) => {
  try {
    const client = new Messaging.Client(credentials);
    await client.send({
      from: fromNumber,
      to: toNumber,
      body: body,
      media: media,
    });
  } catch (err) {
    console.log("Error sending text: ", err);
  }
};

exports.getOpenAiResponse = functions.https.onRequest(async (req, res) => {
  const messageBody = req.body.Body;
  const userPhoneNo = req.body.From;

  console.log("listenForOpenAi function");
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":
          "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: messageBody,
      max_tokens: 70,
      temperature: 0,
    }),
  });
  const data = await response.json();
  console.log(data.choices[0].text);
  const textReply = data.choices[0].text;
  sendTextMessage(textReply.replace("\n\n", ""), userPhoneNo, []);
  res.end();
});


exports.createAiImage = functions.https.onRequest(async (req, res) => {
  const messageBody = req.body.Body;
  const userPhoneNo = req.body.From;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":
          "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      prompt: messageBody,
      n: 1,
      size: "512x512",
    }),
  });

  const data = await response.json();
  // "data" in the returned response object, is an array of image urls.
  // Use the array index to access one, or forEach method
  // to access all (if more than one is requested)
  console.log("data.data[0].url", data.data[0].url);
  const image1 = data.data[0].url;

  sendTextMessage("", userPhoneNo, image1);

  res.end();
});


