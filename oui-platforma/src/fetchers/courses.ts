import { fetcher } from "@/fetchers/fetcher";
import { ICourse } from "@/typings/course";
import { swrKeys } from "./swrKeys";

export function getCourses(showId: string) {
  return fetcher<ICourse[]>(swrKeys.courses);
}

export function newCourse(course: ICourse) {
  return fetcher<{ course: ICourse }>(swrKeys.courses, {
    method: "POST",
    body: JSON.stringify(course),
  });
}

export function deleteCourse(courseId: number) {
  return fetcher(swrKeys.editCourse(courseId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function updateCourse(courseId: number, course: ICourse) {
  return fetcher(swrKeys.editCourse(courseId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
}
