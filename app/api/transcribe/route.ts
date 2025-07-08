import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    console.log("Form data keys:", Array.from(formData.keys()));
    console.log("Audio file:", audioFile);

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate file
    if (audioFile.size === 0) {
      return NextResponse.json(
        { error: "Audio file is empty" },
        { status: 400 }
      );
    }

    console.log("Received audio file:", {
      name: audioFile.name,
      size: audioFile.size,
      type: audioFile.type,
    });

    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Buffer size:", buffer.length);

    // Prepare form-data for Python Whisper server
    const fd = new FormData();
    fd.append("audio", buffer, {
      filename: audioFile.name || "audio.webm",
      contentType: audioFile.type || "audio/webm",
    });

    console.log("Sending to Whisper server...");

    // Call local Whisper server
    const response = await fetch("http://localhost:5001/transcribe", {
      method: "POST",
      body: fd as any,
      headers: {
        ...fd.getHeaders(),
      },
    });

    console.log("Whisper server response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Whisper server error:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }

      return NextResponse.json(
        {
          error: errorData.error || "Transcription service unavailable",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Whisper server response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      {
        error:
          "Transcription failed. Error: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
