"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Square,
  RotateCcw,
  Brain,
  Clock,
  Target,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import Webcam from "react-webcam";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useRouter } from "next/navigation";
import AvatarViewer from "@/components/AvatarViewer";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Avatar = dynamic(() => import("@/components/Avatar"), { ssr: false });

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimit: number;
  tips: string;
}

interface InterviewState {
  isActive: boolean;
  currentQuestion: number;
  totalQuestions: number;
  timeElapsed: number;
  isRecording: boolean;
  micEnabled: boolean;
  videoEnabled: boolean;
}

const mockQuestions: Question[] = [
  {
    id: "1",
    text: "Tell me about yourself and your professional background.",
    category: "General",
    difficulty: "Easy",
    timeLimit: 120,
    tips: "Keep it concise, focus on relevant experience, and connect to the role.",
  },
  {
    id: "2",
    text: "Describe a challenging project you worked on and how you overcame the obstacles.",
    category: "Behavioral",
    difficulty: "Medium",
    timeLimit: 180,
    tips: "Use the STAR method: Situation, Task, Action, Result.",
  },
  {
    id: "3",
    text: "How do you handle working under pressure and tight deadlines?",
    category: "Behavioral",
    difficulty: "Medium",
    timeLimit: 150,
    tips: "Provide specific examples and mention stress management techniques.",
  },
  {
    id: "4",
    text: "Where do you see yourself in 5 years and how does this role align with your goals?",
    category: "Career",
    difficulty: "Easy",
    timeLimit: 120,
    tips: "Show ambition while aligning with the company's growth opportunities.",
  },
];

export default function InterviewPage() {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const router = useRouter();
  const [interviewState, setInterviewState] = useState<InterviewState>({
    isActive: false,
    currentQuestion: 0,
    totalQuestions: mockQuestions.length,
    timeElapsed: 0,
    isRecording: false,
    micEnabled: true,
    videoEnabled: true,
  });

  const [transcript, setTranscript] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [gradeScore, setGradeScore] = useState("");
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>(
    new Array(mockQuestions.length).fill(false)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (interviewState.isActive) {
      interval = setInterval(() => {
        setInterviewState((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewState.isActive]);

  const startInterview = () => {
    setInterviewState((prev) => ({
      ...prev,
      isActive: true,
      currentQuestion: 0,
      timeElapsed: 0,
    }));
  };

  const endInterview = () => {
    if (interviewState.isRecording) {
      stopRecording();
    }
    setInterviewState((prev) => ({
      ...prev,
      isActive: false,
      isRecording: false,
    }));
    router.push("/feedback");
  };

  const nextQuestion = () => {
    // Mark current question as completed
    const newCompletedQuestions = [...completedQuestions];
    newCompletedQuestions[interviewState.currentQuestion] = true;
    setCompletedQuestions(newCompletedQuestions);

    if (interviewState.currentQuestion < interviewState.totalQuestions - 1) {
      setInterviewState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setTranscript("");
      setAiFeedback("");
      setConfidenceScore(0);
      setGradeScore("");
    } else {
      endInterview();
    }
  };
  // Add this ref at the top of your component (alongside other refs)
  const recordedChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      // Get both audio and video tracks, but we'll only use audio
      const stream = webcamRef.current.stream;
      const audioTracks = stream.getAudioTracks();

      if (audioTracks.length === 0) {
        console.error("No audio tracks available");
        return;
      }

      // Create a new MediaStream with only audio tracks
      const audioStream = new MediaStream(audioTracks);

      // Check for supported MIME types
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/wav",
        "audio/mp4",
        "audio/mpeg",
      ];

      let selectedMimeType = "audio/webm";
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      const mediaRecorder = new MediaRecorder(audioStream, {
        mimeType: selectedMimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = []; // Reset chunks in ref
      setRecordedChunks([]); // Reset state

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Received data chunk:", event.data.size, "bytes");
          recordedChunksRef.current.push(event.data); // Store in ref
          setRecordedChunks((prev) => [...prev, event.data]); // Update state for UI
        }
      };

      mediaRecorder.onstop = async () => {
        console.log(
          "Recording stopped, chunks:",
          recordedChunksRef.current.length
        );
        setInterviewState((prev) => ({ ...prev, isRecording: false }));
        setIsProcessing(true);

        try {
          // Use the ref data directly (not the state)
          const chunks = recordedChunksRef.current;

          if (chunks.length === 0) {
            throw new Error("No audio data recorded");
          }

          // Combine recorded chunks into a single Blob
          const blob = new Blob(chunks, {
            type: chunks[0]?.type || selectedMimeType,
          });

          console.log("Created blob:", blob.size, "bytes, type:", blob.type);

          if (blob.size === 0) {
            throw new Error("Audio blob is empty");
          }

          // 1. Send audio to /api/transcribe
          const formData = new FormData();
          formData.append("audio", blob, "recording.webm");

          console.log("Sending audio to transcription API...");
          let transcriptText = "";

          const transcribeRes = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!transcribeRes.ok) {
            const error = await transcribeRes.json();
            console.error("Transcribe failed:", error);
            throw new Error(error?.error || "Transcription failed");
          }

          const transcribeData = await transcribeRes.json();
          transcriptText = transcribeData.transcript || "";
          setTranscript(transcriptText);
          console.log("Transcription successful:", transcriptText);

          // 2. Send transcript to /api/interview/analyze
          if (transcriptText) {
            try {
              const analyzeRes = await fetch("/api/interview/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  transcript: transcriptText,
                  question: mockQuestions[interviewState.currentQuestion].text,
                }),
              });

              if (analyzeRes.ok) {
                const analyzeData = await analyzeRes.json();
                const analysis = analyzeData.analysis || {};
                setAiFeedback(analysis.feedback || "No feedback.");
                setConfidenceScore(analysis.score || 0);
                setGradeScore(analysis.grade || "N/A");
              }
            } catch (err) {
              console.error("Analysis error:", err);
              setAiFeedback("Analysis failed.");
              setConfidenceScore(0);
              setGradeScore("N/A");
            }
          }
        } catch (error) {
          console.error("Processing error:", error);
          if (error instanceof Error) {
            setTranscript("Error: " + error.message);
          } else {
            setTranscript("An unknown error occurred.");
          }
          setAiFeedback("Processing failed.");
          setConfidenceScore(0);
          setGradeScore("N/A");
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorder.start(1000); // Record in 1-second chunks
      setInterviewState((prev) => ({ ...prev, isRecording: true }));
      console.log("Recording started with MIME type:", selectedMimeType);
      const currentQ = mockQuestions[interviewState.currentQuestion]?.text;
      window.dispatchEvent(
        new CustomEvent("avatar-speak-question", {
          detail: { question: currentQ },
        })
      );
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      // The actual processing happens in the onstop event handler above
    }
  };
  const toggleMic = () => {
    setInterviewState((prev) => ({ ...prev, micEnabled: !prev.micEnabled }));
  };

  const toggleVideo = () => {
    setInterviewState((prev) => ({
      ...prev,
      videoEnabled: !prev.videoEnabled,
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = mockQuestions[interviewState.currentQuestion];

  const avatarUrl =
    "https://models.readyplayer.me/687174cf742cffebe6bcf2dd.glb";
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioStateChange = (event: CustomEvent) => {
      setIsPlaying(event.detail.isPlaying);
    };

    window.addEventListener(
      "audio-state-changed",
      handleAudioStateChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "audio-state-changed",
        handleAudioStateChange as EventListener
      );
  }, []);

  const handleButtonClick = () => {
    const evt = new Event("trigger-audio-play");
    window.dispatchEvent(evt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />

      <main className="container-spacing py-10">
        {!interviewState.isActive ? (
          // Pre-Interview Setup
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-6">AI Interview Practice</h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Practice with our AI interviewer and get real-time feedback on
                your performance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl">
                    <Video className="mr-3 h-6 w-6" />
                    Camera Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Webcam View */}
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      {interviewState.videoEnabled ? (
                        <Webcam
                          ref={webcamRef}
                          muted={true}
                          audio={interviewState.micEnabled}
                          className="w-full h-full object-cover"
                          mirrored
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <VideoOff className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Avatar 3D Preview */}
                    <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
                      <Canvas camera={{ position: [0, 0.5, 3], fov: 20 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight
                          position={[3, 5, 2]}
                          intensity={1.2}
                        />
                        <Environment
                          files="/lib/poly_haven_studio_4k.hdr"
                          background
                        />
                        <Avatar url={avatarUrl} />
                        <OrbitControls
                          enableZoom={false}
                          enablePan={false}
                          enableRotate={false}
                        />
                      </Canvas>
                      <div className="absolute bottom-4 w-full text-center z-10">
                        <button
                          id="trigger-btn"
                          onClick={handleButtonClick}
                          className={`px-6 py-2 rounded-full text-white text-sm font-semibold shadow-md transition ${
                            isPlaying ? "bg-red-500" : "bg-teal-500"
                          }`}
                        >
                          {isPlaying ? "STOP" : "TALK"}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl">
                    <Target className="mr-3 h-6 w-6" />
                    Interview Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">
                      Session Overview
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Questions:
                        </span>
                        <span className="text-sm font-medium">
                          {mockQuestions.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Estimated Time:
                        </span>
                        <span className="text-sm font-medium">
                          15-20 minutes
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Difficulty:
                        </span>
                        <Badge variant="secondary">Mixed</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-lg">
                      What to Expect
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li>
                        • AI-generated questions based on common interview
                        patterns
                      </li>
                      <li>• Real-time speech-to-text transcription</li>
                      <li>• Instant feedback on your responses</li>
                      <li>• Performance scoring and improvement suggestions</li>
                    </ul>
                  </div>

                  <Button onClick={startInterview} className="w-full" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          // Active Interview
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            {/* Interview Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                  <span className="font-mono text-xl">
                    {formatTime(interviewState.timeElapsed)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    Question
                  </span>
                  <Badge className="px-3 py-1">
                    {interviewState.currentQuestion + 1} of{" "}
                    {interviewState.totalQuestions}
                  </Badge>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={endInterview}
                className="px-6"
              >
                <Square className="mr-2 h-4 w-4" />
                End Interview
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Video Feed */}
              <div className="lg:col-span-2">
                {/* Avatar for Active Interview */}
                <Card className="mt-">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-xl">
                      <Video className="mr-3 h-6 w-6" />
                      AI Interviewer Avatar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                      <Canvas camera={{ position: [0, 0.5, 3], fov: 20 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight
                          position={[3, 5, 2]}
                          intensity={1.2}
                        />
                        <Environment
                          backgroundIntensity={0.2}
                          files="/lib/poly_haven_studio_4k.hdr"
                          background
                        />
                        <Avatar url={avatarUrl} />
                        <OrbitControls
                          enableZoom={false}
                          enablePan={false}
                          enableRotate={false}
                        />
                      </Canvas>
                      {/* Webcam overlay at bottom right */}
                      {interviewState.videoEnabled && (
                        <div className="absolute bottom-4 right-4 w-44 h-28 rounded-lg overflow-hidden border-2 border-neutral-700 shadow-lg bg-black/80">
                          <Webcam
                            ref={webcamRef}
                            muted={true}
                            audio={interviewState.micEnabled}
                            className="w-full h-full object-cover"
                            mirrored
                          />
                          {interviewState.isRecording && (
                            <div className="absolute top-2 right-2 flex items-center space-x-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              <span>Recording</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
                        {" "}
                        <Button
                          variant={
                            interviewState.micEnabled
                              ? "default"
                              : "destructive"
                          }
                          onClick={toggleMic}
                          className="px-4"
                        >
                          {interviewState.micEnabled ? (
                            <Mic className="h-4 w-4" />
                          ) : (
                            <MicOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant={
                            interviewState.videoEnabled
                              ? "default"
                              : "destructive"
                          }
                          onClick={toggleVideo}
                          className="px-4"
                        >
                          {interviewState.videoEnabled ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <VideoOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant={
                            interviewState.isRecording
                              ? "destructive"
                              : "default"
                          }
                          onClick={
                            interviewState.isRecording
                              ? stopRecording
                              : startRecording
                          }
                          className="px-6"
                        >
                          {interviewState.isRecording ? (
                            <>
                              <Square className="h-4 w-4 mr-2" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Recording
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transcript */}
                <Card className="mt-4">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Live Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[120px] p-6 bg-muted rounded-lg">
                      {isProcessing ? (
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                          <span className="text-sm text-muted-foreground">
                            Processing your response...
                          </span>
                        </div>
                      ) : transcript ? (
                        <p className="text-sm leading-relaxed">{transcript}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Start recording to see your speech transcribed here...
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Question & Feedback Panel */}
              <div className="space-y-6">
                {/* Current Question with Tips */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-xl">
                        <Brain className="mr-3 h-6 w-6" />
                        AI Interviewer
                      </CardTitle>
                      <Badge
                        variant={
                          currentQuestion.difficulty === "Easy"
                            ? "secondary"
                            : currentQuestion.difficulty === "Medium"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">
                            Question {interviewState.currentQuestion + 1}:
                          </p>
                          <Badge variant="outline">
                            {currentQuestion.category}
                          </Badge>
                        </div>
                        <p className="font-medium leading-relaxed text-lg mb-4">
                          {currentQuestion.text}
                        </p>

                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Clock className="w-4 h-4 mr-1" />
                          {Math.floor(currentQuestion.timeLimit / 60)} minutes
                          recommended
                        </div>

                        {/* Tips Section */}
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                💡 Tip:
                              </p>
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                {currentQuestion.tips}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Progress
                        value={
                          ((interviewState.currentQuestion + 1) /
                            interviewState.totalQuestions) *
                          100
                        }
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* AI Feedback */}
                <AnimatePresence>
                  {aiFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card>
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center text-xl">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                            AI Feedback
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                              <p className="text-sm leading-relaxed text-green-800 dark:text-green-200">
                                {aiFeedback}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">
                                  {confidenceScore}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Confidence
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">
                                  {gradeScore}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Grade
                                </p>
                              </div>
                            </div>

                            <Button
                              onClick={nextQuestion}
                              className="w-full"
                              disabled={!aiFeedback}
                            >
                              {interviewState.currentQuestion <
                              interviewState.totalQuestions - 1
                                ? "Next Question"
                                : "Finish Interview"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interview Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Interview Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockQuestions.map((q, index) => (
                        <div
                          key={q.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                            index === interviewState.currentQuestion
                              ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                              : completedQuestions[index]
                              ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                              : "bg-muted/30"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              index === interviewState.currentQuestion
                                ? "bg-blue-600 text-white"
                                : completedQuestions[index]
                                ? "bg-green-600 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {completedQuestions[index] ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {q.category}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {Math.floor(q.timeLimit / 60)} min •{" "}
                              {q.difficulty}
                            </p>
                          </div>
                          <Badge
                            variant={
                              q.difficulty === "Easy"
                                ? "secondary"
                                : q.difficulty === "Medium"
                                ? "default"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
