"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  TrendingUp,
  Download,
  Share2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Star,
  Clock,
  Video,
  Brain,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

const overallScore = 85;
const previousScore = 72;
const improvement = overallScore - previousScore;

const skillBreakdown = [
  {
    skill: "Communication",
    score: 88,
    feedback: "Excellent clarity and articulation",
  },
  {
    skill: "Technical Knowledge",
    score: 82,
    feedback: "Strong understanding, room for depth",
  },
  {
    skill: "Problem Solving",
    score: 90,
    feedback: "Outstanding analytical approach",
  },
  {
    skill: "Confidence",
    score: 78,
    feedback: "Good presence, work on body language",
  },
];

const questionAnalysis = [
  {
    question: "Tell me about yourself and why you're interested in this role.",
    score: 85,
    feedback:
      "Great response! You clearly articulated your experience and connected it to the role. Your enthusiasm came through well.",
    improvements: [
      "Add a specific project example",
      "Mention quantifiable achievements",
    ],
    transcript:
      "I have over 5 years of experience in software development, particularly in React and Node.js...",
  },
  {
    question:
      "Describe a challenging project you worked on and how you overcame obstacles.",
    score: 88,
    feedback:
      "Excellent use of the STAR method. Your problem-solving approach was clear and methodical.",
    improvements: ["Elaborate on the impact of your solution"],
    transcript:
      "In my previous role, we faced a critical performance issue with our main application...",
  },
  {
    question: "How do you handle working under pressure and tight deadlines?",
    score: 82,
    feedback:
      "Good examples provided. Consider mentioning specific stress management techniques.",
    improvements: [
      "Add more concrete examples",
      "Discuss team collaboration under pressure",
    ],
    transcript:
      "I thrive under pressure by breaking down complex tasks into manageable components...",
  },
];

const recommendations = [
  {
    title: "Practice Technical Deep Dives",
    description: "Spend more time explaining technical concepts in detail",
    priority: "High",
    icon: Brain,
  },
  {
    title: "Improve Body Language",
    description: "Work on maintaining eye contact and confident posture",
    priority: "Medium",
    icon: Video,
  },
  {
    title: "Quantify Achievements",
    description: "Include specific numbers and metrics in your examples",
    priority: "High",
    icon: Target,
  },
];

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Interview Complete
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Here&apos;s your detailed performance analysis and feedback
          </p>

          {/* Overall Score */}
          <div className="flex items-center justify-center space-x-12 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-green-600">
                {overallScore}%
              </div>
              <p className="text-muted-foreground">Overall Score</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-2xl font-bold mb-2 text-emerald-600">
                <TrendingUp className="w-6 h-6 mr-2" />+{improvement}%
              </div>
              <p className="text-muted-foreground">Improvement</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="px-6">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="lg" className="px-6 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            <Link href="/interview">
              <Button
                variant="outline"
                size="lg"
                className="px-6 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Practice Again
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Detailed Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 h-11">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="recommendations">Tips</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">
                      {overallScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Overall Score
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">18:30</div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">5/5</div>
                    <p className="text-sm text-muted-foreground">
                      Questions Answered
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">
                      +{improvement}%
                    </div>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>
                    Your scores across different skill areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillBreakdown.map((skill, index) => (
                      <motion.div
                        key={skill.skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.skill}</span>
                          <span
                            className={`text-sm font-mono ${
                              skill.score >= 85
                                ? "text-green-600"
                                : skill.score >= 70
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {skill.score}%
                          </span>
                        </div>
                        <Progress value={skill.score} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {skill.feedback}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-6">
              {questionAnalysis.map((qa, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            Question {index + 1}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {qa.question}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold mb-2 ${
                              qa.score >= 85
                                ? "text-green-600"
                                : qa.score >= 70
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {qa.score}%
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(qa.score / 20)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* AI Feedback */}
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{qa.feedback}</p>
                        </div>
                      </div>

                      {/* Improvements */}
                      {qa.improvements.length > 0 && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium mb-2">
                                Areas for Improvement:
                              </p>
                              <ul className="text-sm space-y-1">
                                {qa.improvements.map((improvement, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center space-x-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                                    <span>{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transcript */}
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <p className="text-sm font-medium mb-2">
                          Your Response:
                        </p>
                        <p className="text-sm text-muted-foreground italic">
                          &quot;{qa.transcript}...&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {skillBreakdown.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {skill.skill}
                          <Badge variant="secondary">{skill.score}%</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={skill.score} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            {skill.feedback}
                          </p>
                          {/* Skill-specific recommendations */}
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">
                              <strong>💡 Tip:</strong>{" "}
                              {skill.skill === "Communication"
                                ? "Practice speaking slowly and clearly. Use pauses effectively."
                                : skill.skill === "Technical Knowledge"
                                ? "Review fundamental concepts and practice explaining them simply."
                                : skill.skill === "Problem Solving"
                                ? "Continue using structured approaches like breaking down problems."
                                : "Work on maintaining eye contact and confident body language."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid gap-6">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon;

                  return (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                rec.priority === "High"
                                  ? "bg-red-100 dark:bg-red-950/20"
                                  : "bg-blue-100 dark:bg-blue-950/20"
                              }`}
                            >
                              <Icon
                                className={`w-6 h-6 ${
                                  rec.priority === "High"
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">
                                  {rec.title}
                                </h3>
                                <Badge
                                  variant={
                                    rec.priority === "High"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {rec.priority} Priority
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">
                                {rec.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                  <CardDescription>
                    Here&apos;s what you can do to continue improving
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p className="text-sm">
                        Practice 2-3 more technical interviews this week
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p className="text-sm">
                        Record yourself answering questions to improve body
                        language
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p className="text-sm">
                        Review and practice the STAR method for behavioral
                        questions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
