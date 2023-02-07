<script setup>
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const messages = ref([]);
const showText = ref(true);
const hideText = () => {
  if (showText.value === true) {
    showText.value = false;
  } else {
    showText.value = true;
  }
};

const elements = ref([]);

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

const playMessageAudio = (url, index) => {
  console.log("playMessageAudio");
  console.log("index", index);
  elements.value[index].style.outline = "10px solid #A61C3C";
  const voicemail = new Audio(url);
  voicemail.play();

  voicemail.onended = function () {
    elements.value[index].style.outline = "none";
  };
};

const q = query(
  collection(db, "voicemailTranscriptions"),
  orderBy("time", "asc")
);
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New message: ", change.doc.data());
      messages.value.unshift(change.doc.data());
      makeHumanReadableTime(change.doc.data().time);
    }
  });
});
</script>

<template>
  <div class="margin-left">
    <h1 class="font">Audio Social</h1>
    <button class="select" @click="hideText">text / audio</button>
  </div>
  <div
    v-for="(message, i) in messages"
    :key="message.callSid"
    :class="{
      'animate__animated animate__bounceInDown': i === 0,
    }"
    @click="playMessageAudio(message.audioURL, i)"
    style="cursor: pointer"
  >
    <div class="message" :ref="(el) => (elements[i] = el)">
      <div v-if="showText">{{ message.transcriptText }}</div>
      <audio
        style="border: none"
        v-else
        controls
        :src="message.audioURL"
      ></audio>
    </div>
    <div style="font-size: small; font-weight: bold" class="font margin-left">
      {{ makeHumanReadableTime(message.time) }}
    </div>
  </div>
</template>

<style>
.message {
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  border-radius: 5px;
  background-color: #f4ac45;
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
  background-color: #f4ac45;
}

audio::-webkit-media-controls-play-button {
  background-color: white;
  border-radius: 50%;
  color: white;
}

.select {
  background-color: #a61c3c;
}

.font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.margin-left {
  margin-left: 28vw;
}
</style>
