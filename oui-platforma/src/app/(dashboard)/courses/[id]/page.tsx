"use client";

import { CoursePage } from "@/components/feature/Course/CoursePage/CoursePage";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse } from "@/typings/course";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Course() {
  const { id } = useParams() as { id: string };

  const { data: course, error: courseError } = useSWR(
    id ? swrKeys.editCourse(parseInt(id)) : null,
    fetcher<ICourse>
  );

  if (courseError) {
    return <div>Failed to load course.</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  console.log(course);
  return <CoursePage course={course} courseError={courseError} />;
}
