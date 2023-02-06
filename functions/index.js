const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
initializeApp();

const db = getFirestore();
const functions = require("firebase-functions");

exports.listTranscriptions = functions.https.onRequest(async (req, res) => {
  try {
    console.log("CallSid", req.body.CallSid);
    console.log("TranscriptionSid", req.body.TranscriptionSid);
    console.log("TranscriptionText", req.body.TranscriptionText);

    await db.collection("voicemailTranscriptions").doc(req.body.CallSid).set({

      transcriptText: req.body.TranscriptionText,
      transcriptionSid: req.body.TranscriptionSid,
      recordingSid: req.body.RecordingSid,
      callSid: req.body.CallSid,
      from: req.body.From,
      time: Date.now(),

    });
  } catch (err) {
    console.log("Error getting transactions: ", err);
  }
  res.end();
});


