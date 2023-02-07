<script setup>
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const messageArray = ref([]);
const showText = ref(true);
const hideText = () => {
  if (showText.value === true) {
    showText.value = false;
  } else {
    showText.value = true;
  }
};

const makeHumanReadableTime = (epochMilliseconds) => {
  const date = new Date(epochMilliseconds);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const humanReadableTime = date.toLocaleDateString("en-US", options);

  return humanReadableTime;
};

const q = query(
  collection(db, "voicemailTranscriptions"),
  orderBy("time", "asc")
);
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New message: ", change.doc.data());
      messageArray.value.unshift(change.doc.data());
      makeHumanReadableTime(change.doc.data().time);
    }
  });
});
</script>

<template>
  <div style="margin-left: 25%">
    <h1 class="font">Messages</h1>
    <button
      :class="{ 'audio-only': showText, 'text-only': !showText }"
      @click="hideText"
    >
      text / audio
    </button>
  </div>
  <div
    v-for="(message, i) in messageArray"
    :key="message.callSid"
    :class="{ 'animate__animated animate__bounceInDown': i === 0 }"
  >
    <div class="message">
      <div v-if="showText">{{ message.transcriptText }}</div>
      <audio
        style="border: none"
        v-else
        controls
        :src="message.audioURL"
      ></audio>
    </div>
    <div
      style="margin-left: 25%; font-size: small; font-weight: bold"
      class="font"
    >
      {{ makeHumanReadableTime(message.time) }}
    </div>
  </div>
</template>

<style>
.message {
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 25%;
  max-width: 50%;
  border-radius: 5px;
  background-color: gray;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* font-size: small; */
  min-height: 80px;
  font-weight: bold;
}

button {
  /* background-color: brown; */
  color: white;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  font-weight: bold;
}

audio::-webkit-media-controls-panel {
  background-color: gray;
}

audio::-webkit-media-controls-play-button {
  background-color: white;
  border-radius: 50%;
  color: white;
}

.audio-only {
  background-color: blue;
}

.text-only {
  background-color: red;
}

.font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
