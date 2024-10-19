"use client";
import { CoursePage } from "@/components/feature/Course/CoursePage/CoursePage";
import { mockCourses } from "@/components/feature/mock/mockCourses";

export default function Page() {
  return <CoursePage course={mockCourses[1]} />;
}
