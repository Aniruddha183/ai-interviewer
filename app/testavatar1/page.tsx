"use client";
import dynamic from "next/dynamic";

const AvatarWithLipSync = dynamic(
  () => import("@/components/AvatarWithLipSync"),
  { ssr: false }
);

export default function HomePage() {
  return <AvatarWithLipSync />;
}
