"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Lightbulb
} from 'lucide-react';
import Webcam from 'react-webcam';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { useRouter } from 'next/navigation';
interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
    id: '1',
    text: 'Tell me about yourself and your professional background.',
    category: 'General',
    difficulty: 'Easy',
    timeLimit: 120,
    tips: 'Keep it concise, focus on relevant experience, and connect to the role.'
  },
  {
    id: '2',
    text: 'Describe a challenging project you worked on and how you overcame the obstacles.',
    category: 'Behavioral',
    difficulty: 'Medium',
    timeLimit: 180,
    tips: 'Use the STAR method: Situation, Task, Action, Result.'
  },
  {
    id: '3',
    text: 'How do you handle working under pressure and tight deadlines?',
    category: 'Behavioral',
    difficulty: 'Medium',
    timeLimit: 150,
    tips: 'Provide specific examples and mention stress management techniques.'
  },
  {
    id: '4',
    text: 'Where do you see yourself in 5 years and how does this role align with your goals?',
    category: 'Career',
    difficulty: 'Easy',
    timeLimit: 120,
    tips: 'Show ambition while aligning with the company\'s growth opportunities.'
  }
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
    videoEnabled: true
  });

  const [transcript, setTranscript] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [gradeScore, setGradeScore] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>(new Array(mockQuestions.length).fill(false));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (interviewState.isActive) {
      interval = setInterval(() => {
        setInterviewState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewState.isActive]);

  const startInterview = () => {
    setInterviewState(prev => ({
      ...prev,
      isActive: true,
      currentQuestion: 0,
      timeElapsed: 0
    }));
  };

  const endInterview = () => {
    if (interviewState.isRecording) {
      stopRecording();
    }
    setInterviewState(prev => ({
      ...prev,
      isActive: false,
      isRecording: false
    }));
    router.push('/feedback');
  };

  const nextQuestion = () => {
    // Mark current question as completed
    const newCompletedQuestions = [...completedQuestions];
    newCompletedQuestions[interviewState.currentQuestion] = true;
    setCompletedQuestions(newCompletedQuestions);

    if (interviewState.currentQuestion < interviewState.totalQuestions - 1) {
      setInterviewState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
      setTranscript('');
      setAiFeedback('');
      setConfidenceScore(0);
      setGradeScore('');
    } else {
      endInterview();
    }
  };

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.start();
      setInterviewState(prev => ({ ...prev, isRecording: true }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setInterviewState(prev => ({ ...prev, isRecording: false }));
      
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        const mockTranscripts = [
          "I have over 5 years of experience in software development, specializing in full-stack web applications. I'm passionate about creating user-friendly solutions and have led several successful projects in my current role.",
          "In my previous role, I faced a challenging deadline for a client project. I organized daily standups, prioritized features, and collaborated closely with the design team to deliver on time while maintaining quality.",
          "I handle pressure by breaking down tasks into manageable chunks, maintaining clear communication with stakeholders, and using time management techniques like the Pomodoro method to stay focused.",
          "In 5 years, I see myself in a senior technical leadership role, mentoring junior developers and driving architectural decisions. This role aligns perfectly with my goal to grow both technically and as a leader."
        ];
        
        const mockFeedbacks = [
          "Great response! You provided specific details about your experience and showed enthusiasm. Consider adding more quantifiable achievements to strengthen your answer.",
          "Excellent use of the STAR method! You clearly outlined the situation, your actions, and the results. Your problem-solving approach comes through well.",
          "Good examples of stress management techniques. Your response shows self-awareness and practical solutions. Consider mentioning how you communicate with team members during high-pressure situations.",
          "Strong career vision that aligns well with growth opportunities. Your ambition is clear and realistic. Consider mentioning specific skills you want to develop."
        ];

        const mockScores = [85, 92, 78, 88];
        const mockGrades = ['B+', 'A-', 'B', 'B+'];
        
        const currentIndex = interviewState.currentQuestion;
        setTranscript(mockTranscripts[currentIndex]);
        setAiFeedback(mockFeedbacks[currentIndex]);
        setConfidenceScore(mockScores[currentIndex]);
        setGradeScore(mockGrades[currentIndex]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const toggleMic = () => {
    setInterviewState(prev => ({ ...prev, micEnabled: !prev.micEnabled }));
  };

  const toggleVideo = () => {
    setInterviewState(prev => ({ ...prev, videoEnabled: !prev.videoEnabled }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = mockQuestions[interviewState.currentQuestion];

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
                Practice with our AI interviewer and get real-time feedback on your performance
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
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {interviewState.videoEnabled ? (
                      <Webcam
                        ref={webcamRef}
                        audio={interviewState.micEnabled}
                        className="w-full h-full object-cover"
                        mirrored
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <VideoOff className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
                      <Button
                        size="sm"
                        variant={interviewState.micEnabled ? "default" : "destructive"}
                        onClick={toggleMic}
                        className="px-4 py-2"
                      >
                        {interviewState.micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant={interviewState.videoEnabled ? "default" : "destructive"}
                        onClick={toggleVideo}
                        className="px-4 py-2"
                      >
                        {interviewState.videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
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
                    <h3 className="font-semibold mb-4 text-lg">Session Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Questions:</span>
                        <span className="text-sm font-medium">{mockQuestions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Time:</span>
                        <span className="text-sm font-medium">15-20 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Difficulty:</span>
                        <Badge variant="secondary">Mixed</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-lg">What to Expect</h3>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li>• AI-generated questions based on common interview patterns</li>
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
                  <span className="font-mono text-xl">{formatTime(interviewState.timeElapsed)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Question</span>
                  <Badge className="px-3 py-1">{interviewState.currentQuestion + 1} of {interviewState.totalQuestions}</Badge>
                </div>
              </div>
              <Button variant="destructive" onClick={endInterview} className="px-6">
                <Square className="mr-2 h-4 w-4" />
                End Interview
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Video Feed */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      {interviewState.videoEnabled ? (
                        <Webcam
                          ref={webcamRef}
                          audio={interviewState.micEnabled}
                          className="w-full h-full object-cover"
                          mirrored
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <VideoOff className="h-20 w-20 text-muted-foreground" />
                        </div>
                      )}
                      
                      {interviewState.isRecording && (
                        <div className="absolute top-6 right-6 flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Recording</span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
                        <Button
                          variant={interviewState.micEnabled ? "default" : "destructive"}
                          onClick={toggleMic}
                          className="px-4"
                        >
                          {interviewState.micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant={interviewState.videoEnabled ? "default" : "destructive"}
                          onClick={toggleVideo}
                          className="px-4"
                        >
                          {interviewState.videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant={interviewState.isRecording ? "destructive" : "default"}
                          onClick={interviewState.isRecording ? stopRecording : startRecording}
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
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Live Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[120px] p-6 bg-muted rounded-lg">
                      {isProcessing ? (
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                          <span className="text-sm text-muted-foreground">Processing your response...</span>
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
                      <Badge variant={currentQuestion.difficulty === 'Easy' ? 'secondary' : 
                                   currentQuestion.difficulty === 'Medium' ? 'default' : 'destructive'}>
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">Question {interviewState.currentQuestion + 1}:</p>
                          <Badge variant="outline">{currentQuestion.category}</Badge>
                        </div>
                        <p className="font-medium leading-relaxed text-lg mb-4">{currentQuestion.text}</p>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Clock className="w-4 h-4 mr-1" />
                          {Math.floor(currentQuestion.timeLimit / 60)} minutes recommended
                        </div>

                        {/* Tips Section */}
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">💡 Tip:</p>
                              <p className="text-sm text-blue-800 dark:text-blue-200">{currentQuestion.tips}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={(interviewState.currentQuestion + 1) / interviewState.totalQuestions * 100} 
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
                              <p className="text-sm leading-relaxed text-green-800 dark:text-green-200">{aiFeedback}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">{confidenceScore}%</p>
                                <p className="text-xs text-muted-foreground">Confidence</p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{gradeScore}</p>
                                <p className="text-xs text-muted-foreground">Grade</p>
                              </div>
                            </div>

                            <Button 
                              onClick={nextQuestion} 
                              className="w-full"
                              disabled={!aiFeedback}
                            >
                              {interviewState.currentQuestion < interviewState.totalQuestions - 1 ? 
                                'Next Question' : 'Finish Interview'
                              }
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
                    <CardTitle className="text-lg">Interview Progress</CardTitle>
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
                            <p className="text-sm font-medium truncate">{q.category}</p>
                            <p className="text-xs text-muted-foreground">
                              {Math.floor(q.timeLimit / 60)} min • {q.difficulty}
                            </p>
                          </div>
                          <Badge 
                            variant={q.difficulty === 'Easy' ? 'secondary' : 
                                   q.difficulty === 'Medium' ? 'default' : 'destructive'}
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