<script setup>
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const messageArray = ref([]);

const q = query(
  collection(db, "voicemailTranscriptions"),
  orderBy("time", "asc")
);
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New message: ", change.doc.data());
      messageArray.value.unshift(change.doc.data());
    }
  });
});
</script>

<template>
  <h1>message feed 2</h1>
  <div v-for="message in messageArray">
    {{ message.transcriptText }}
  </div>
</template>

<style></style>
