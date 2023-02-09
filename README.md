<!-- @format -->

# Title: Audio Social

# Description:

Audio Social is an open social application that presents voicemails on a social media feed. It uses Firebase for the backend, SignalWire to receive calls, and Vue.js for the front end. Using SignalWire Compatibility XML, I created a Voice XLM bin to determine how a phone number would handle voicemails. Using the ‘Record’ command with the ‘transcribe’ attribute, voicemails are recorded, transcribed, then saved to my Signalwire account. A Firebase cloud function “getTranscription” is triggered by the ‘transcribeCallback’ attribute, and the transcription text, and a URL to the voicemail recording are sent to a Cloud Firestore database. On the front end, the Feed.vue component listens for messages as they added to the database, and displays them in real-time.

# How to use:

Transcriptions of voicemails are displayed on a feed. To hear the original voicemail, click the message. To view the feed as audio only, press the "text/audio" button. To add a post of your own, call the Signnalwire number listed bellow, and leave a message - it will appear on the feed moments later.

Tel: +1 (888) 473 7417

**Video Demo:**

https://firebasestorage.googleapis.com/v0/b/textvote-7a52e.appspot.com/o/images%2FAudio-Social-Video.mp4?alt=media&token=3ac523fb-5d9c-4d28-9b6e-ccad46843ae5

**Demo Site:**

https://udemy-vue-firebase-sites-ea94e.web.app

**Sandbox:**

https://codesandbox.io/p/github/markokoh/Audio-Social/main?file=%2Ffunctions%2Findex.js

If you wish to fork this project and make your own version, you will need Firebase and SignalWire accounts:

https://signalwire.com/

https://firebase.google.com/

The code is made available through a GNU LGPLv3 license.

Mark Okoh
