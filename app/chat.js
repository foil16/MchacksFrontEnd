const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

async function runCompletion(imagelink) {
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
              url: imagelink,
            },
          },
        ],
      },
    ],
  });

  return response;
}
module.exports = runCompletion;
