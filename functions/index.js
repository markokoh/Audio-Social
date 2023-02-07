const {initializeApp} = require("firebase-admin/app");
const {getFirestore, Timestamp} = require("firebase-admin/firestore");
initializeApp();
// const createdAt = admin.firestore.Timestamp.fromDate(new Date());

const db = getFirestore();
const functions = require("firebase-functions");

exports.listTranscriptions = functions.https.onRequest(async (req, res) => {
  try {
    console.log("CallSid", req.body.CallSid);
    console.log("TranscriptionSid", req.body.TranscriptionSid);
    console.log("TranscriptionText", req.body.TranscriptionText);
    const audioURL =
        "https://onyourfrequency.signalwire.com/api/laml/2010-04-01/Accounts/5e5451d0-ffab-4b99-8758-9d6f135b4938/Recordings/" +
        req.body.RecordingSid;

    await db.collection("voicemailTranscriptions").doc(req.body.CallSid).set({

      transcriptText: req.body.TranscriptionText,
      transcriptionSid: req.body.TranscriptionSid,
      recordingSid: req.body.RecordingSid,
      callSid: req.body.CallSid,
      from: req.body.From,
      time: Date.now(),
      timestamp: Timestamp.now(),
      audioURL,

    });
  } catch (err) {
    console.log("Error getting transactions: ", err);
  }
  res.end();
});


