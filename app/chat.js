const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "REDACTED_OPENAI_KEY",
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
              url: imagelinke,
            },
          },
        ],
      },
    ],
  });

  return response;
}
module.exports = runCompletion;
