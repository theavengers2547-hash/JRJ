"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const generateVideo = async () => {
    if (!image || !audio) {
      alert("Upload foto dan audio terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("prompt", prompt);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.videoUrl) {
      setVideoUrl(data.videoUrl);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5">
          AI Singing Video Generator
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mb-4 block w-full"
        />

        <input
          type="file"
          accept="audio/mp3,audio/mpeg"
          onChange={(e) => setAudio(e.target.files?.[0] || null)}
          className="mb-4 block w-full"
        />

        <textarea
          placeholder="Masukkan prompt video..."
          className="border p-3 rounded w-full mb-4"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateVideo}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Generate Video
        </button>

        {videoUrl && (
          <div className="mt-6">
            <video
              controls
              className="w-full rounded"
              src={videoUrl}
            />

            <a
              href={videoUrl}
              download
              className="block mt-4 bg-green-600 text-white text-center p-3 rounded"
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
