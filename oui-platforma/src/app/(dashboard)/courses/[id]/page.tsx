"use client";

import { CoursePage } from "@/components/feature/Course/CoursePage/CoursePage";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse } from "@/typings/course";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
export default function Page() {
  const { id } = useParams() as { id: string };

  const { data: course, error: courseError } = useSWR(
    id ? swrKeys.editCourse(parseInt(id)) : null,
    fetcher<ICourse>,
    { refreshInterval: 10000 }
  );

  useEffect(() => {
    if (course?.title) {
      document.title = `Course - ${course.title}`;
    } else {
      document.title = "Course";
    }
  }, [course]);

  if (courseError) {
    return <div>Failed to load course.</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return <CoursePage course={course} courseError={courseError} />;
}
