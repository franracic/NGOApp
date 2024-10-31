import { MentorshipSection } from "@/components/feature/mentor/MentorshipSection/MentorhipSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship - Guidance and Support",
  description:
    "Explore our mentorship programs and connect with experienced mentors.",
};

export default function Mentorship() {
  return <MentorshipSection />;
}
