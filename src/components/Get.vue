<template>
  <h1><button @click="createAiImage">Get</button></h1>
</template>

<script setup>
async function listenForOpenAi() {
  console.log("listenForOpenAi function");
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Names for a pet snake",
      max_tokens: 21,
      temperature: 0,
      // echo: true,
      //   suffix: " ",
    }),
  });
  const data = await response.json();
  const textReply = data.choices[0].text;

  console.log(textReply.replace("\n\n", ""));
}

async function createAiImage() {
  console.log("createAiImage");

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      prompt: "A cute white kitten",
      n: 1,
      size: "1024x1024",
      // response_format: "url"
      // echo: true,
    }),
  });

  const data = await response.json();
  // "data" in returned response object is an array of image urls
  // Use array index to access one, or forEach method
  // to get all (if more than one is requested)
  console.log("data.data[0].url", data.data[0].url);
}
</script>

<style></style>
