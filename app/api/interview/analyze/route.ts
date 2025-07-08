import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, questionId, transcript, question } =
      await request.json();

    if (!transcript) {
      return NextResponse.json(
        { error: "No transcript provided" },
        { status: 400 }
      );
    }

    // Call local LLM analysis server
    const response = await fetch("http://localhost:5002/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript,
        question: question || "Tell me about yourself",
      }),
    });
    console.log("Transcript received:", transcript);
    console.log("Question:", question);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.error || "Analysis service unavailable",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error:
          "Analysis failed. Make sure the LLM server is running on localhost:5002",
      },
      { status: 500 }
    );
  }
}
