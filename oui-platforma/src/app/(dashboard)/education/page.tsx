"use client";

import { EducationSection } from "@/components/feature/courses/EducationSection/EducationSection";
import { mockCourses } from "@/components/feature/mock/mockCourses";

export default function Education() {
  return <EducationSection courses={mockCourses} />;
}
