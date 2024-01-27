import React, { useState, useRef } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setShowVideo(false);
      setImage(URL.createObjectURL(img));
    }
  };
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handleCaptureClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowVideo(true);
      setImage(false);
      console.log(videoRef.current);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera.");
      setShowVideo(false);
    }
  };

  const handleSnap = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setShowVideo(false);
    }
  };
  return (
    <div>
      <div>
        <button onClick={handleCaptureClick}>Use Webcam</button>
        <p>or</p>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          onChange={handleImageChange}
          style={{
            marginLeft: "65px",
          }}
        />
      </div>
      {image && (
        <img
          style={{ marginTop: "30px", width: "216", height: "384px" }}
          src={image}
          alt="Uploaded"
        />
      )}
      <video
        ref={videoRef}
        style={{
          width: "216",
          height: "384px",
          display: showVideo ? "block" : "none",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
      />
      <button
        onClick={handleSnap}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
          display: showVideo ? "block" : "none",
        }}
      >
        Snap
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default ImageUpload;
