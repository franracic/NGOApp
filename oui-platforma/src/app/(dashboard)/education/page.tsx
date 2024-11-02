import EducationSection from "@/components/feature/courses/EducationSection/EducationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lectures - Education",
  description: "Explore various educational lectures and resources.",
};

export default function Page() {
  return <EducationSection />;
}
