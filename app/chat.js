const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

async function runCompletion(imagelinke) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              url: "data:image/jpeg;base64," + { imagelinke },
            },
          },
        ],
      },
    ],
  });

  return response;
}
module.exports = runCompletion;
