"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Target,
  BarChart3,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import AvatarViewer from "@/components/AvatarViewer";
// Load Avatar dynamically (avoids SSR problems)
const Avatar = dynamic(() => import("@/components/Avatar"), { ssr: false });
interface InterviewSession {
  id: string;
  title: string;
  date: string;
  duration: number;
  score: number;
  industry: string;
  status: "completed" | "in-progress";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    totalHours: 0,
    improvement: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setSessions([
      {
        id: "1",
        title: "Software Engineer Interview",
        date: "2024-01-15",
        duration: 45,
        score: 85,
        industry: "Technology",
        status: "completed",
      },
      {
        id: "2",
        title: "Product Manager Interview",
        date: "2024-01-12",
        duration: 60,
        score: 78,
        industry: "Technology",
        status: "completed",
      },
      {
        id: "3",
        title: "Data Scientist Interview",
        date: "2024-01-10",
        duration: 50,
        score: 92,
        industry: "Technology",
        status: "completed",
      },
    ]);

    setStats({
      totalSessions: 12,
      averageScore: 85,
      totalHours: 8.5,
      improvement: 15,
    });
  }, []);

  //avatar logic
  const avatarUrl =
    "https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb";
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
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Welcome back, {user?.name || "there"}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Ready to practice your interview skills today?
          </motion.p>
        </div>
        {/* <div className="w-[400px] h-[600px] md:h-[380px] bg-black overflow-hidden">
          {" "}
          <AvatarViewer />
          
        </div> */}
        <div style={{ width: "30%", height: "480px", position: "relative" }}>
          <Canvas camera={{ position: [0, 0.5, 3], fov: 20 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} />
            <Environment preset="city" />
            <Avatar url={avatarUrl} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>

          {/* Button positioned below the centered avatar */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              width: "100%",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <button
              id="trigger-btn"
              style={{
                padding: "12px 30px",
                borderRadius: "30px",
                border: "none",
                background: isPlaying ? "#ff6b6b" : "#4ecdc4",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transition: "background 0.3s",
                minWidth: "120px",
              }}
              onClick={handleButtonClick}
            >
              {isPlaying ? "STOP" : "TALK"}
            </button>
          </div>
        </div>
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <Link href="/interview">
            <Card className="group bg-neutral-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors text-lg">
                  Start New Interview
                </h3>
                <p className="text-sm text-muted-foreground">
                  Practice with our AI interviewer
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="group bg-neutral-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Video className="h-6 w-6 text-blue-500" />
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3 text-lg">Mock Interview</h3>
              <p className="text-sm text-muted-foreground">
                Schedule with real interviewers
              </p>
            </CardContent>
          </Card>

          <Card className="group  bg-neutral-900  hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3 text-lg">View Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track your progress over time
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          <Card className="p-6 bg-neutral-900">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Calendar className="h-6 w-6 text-muted-foreground" />
                <Badge variant="secondary">{stats.totalSessions}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">
                Total Sessions
              </p>
              <p className="text-3xl font-bold">{stats.totalSessions}</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-neutral-900">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Award className="h-6 w-6 text-muted-foreground" />
                <Badge variant="secondary">{stats.averageScore}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">
                Average Score
              </p>
              <p className="text-3xl font-bold">{stats.averageScore}%</p>
              <Progress value={stats.averageScore} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="p-6 bg-neutral-900">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <Badge variant="secondary">{stats.totalHours}h</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">
                Practice Time
              </p>
              <p className="text-3xl font-bold">{stats.totalHours} hours</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-neutral-900">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
                <Badge variant="secondary" className="text-green-600">
                  +{stats.improvement}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">Improvement</p>
              <p className="text-3xl font-bold">+{stats.improvement}%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">
                Recent Interview Sessions
              </CardTitle>
              <CardDescription className="text-base">
                Your latest practice sessions and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Left section */}
                    <div className="flex items-start sm:items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg">
                          {session.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {session.industry} • {session.duration} minutes
                        </p>
                      </div>
                    </div>

                    {/* Right section */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
                      <Badge
                        variant={session.score >= 80 ? "default" : "secondary"}
                        className="w-fit px-3 py-1"
                      >
                        {session.score}%
                      </Badge>
                      <p className="text-muted-foreground">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-4 w-full sm:w-auto"
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="px-8 py-3 w-full sm:w-auto"
                >
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
