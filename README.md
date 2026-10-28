# Recipe Ideas from a Photo

Snap or upload a photo of your ingredients and get five dishes you could make with them, suggested by an OpenAI vision model.

Built at **McHacks 11** (McGill, January 2024) in about 24 hours.

<!-- TODO: add a screenshot or GIF here (webcam capture → suggested dishes) -->

## Tech stack

- **Frontend:** React (Create React App), browser `getUserMedia` webcam capture, Canvas API
- **Backend:** Node.js, Express, `express-fileupload`
- **AI:** OpenAI Chat Completions API with image input

## How it works

1. The React app either opens the webcam and grabs a frame onto a `<canvas>`, or takes an uploaded image.
2. It re-encodes the image as a base64 JPEG data URL and POSTs it to the Express server (`/process`).
3. The server sends the image to OpenAI with a prompt asking for five dishes and their ingredients, then returns the model's text to the page.

## Running it locally

Requirements: Node.js 18+ and an OpenAI API key.

**Backend** (port 2900):

```bash
cd app
npm install
cp .env.example .env   # then put your key in OPENAI_API_KEY
node app.js
```

**Frontend** (port 3000), in a second terminal:

```bash
cd front
npm install
npm start
```

Open http://localhost:3000, click **Use Webcam** then **Snap** (or upload an image), then click **Send**.
