import { fetcher } from "@/fetchers/fetcher";
import { ICourse, ITrophy } from "@/typings/course";
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

export function getCourseById(courseId: number) {
  return fetcher<ICourse>(swrKeys.editCourse(courseId));
}

export function completeCourse(courseId: number) {
  return fetcher(swrKeys.completeCourse(courseId), {
    method: "POST",
  });
}

export function completeContent(contentId: number) {
  return fetcher(swrKeys.completeContent(contentId), {
    method: "POST",
  });
}

export function addRating(courseId: number, rating: number) {
  return fetcher<ICourse>(`${swrKeys.editCourse(courseId)}rate/`, {
    method: "POST",
    body: JSON.stringify({ rating }),
  });
}

export function getAllTrophiesWithProgress() {
  return fetcher<ITrophy[]>(`${swrKeys.trophyTemplates}with_user_progress/`, {
    method: 'GET',
  });
}