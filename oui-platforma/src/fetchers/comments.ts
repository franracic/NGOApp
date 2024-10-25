import { IComment } from "@/typings/course";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export function getComments() {
  return fetcher<IComment[]>(swrKeys.comments, {
    method: "GET",
  });
}

export function addComment(content: string, courseId: number) {
  return fetcher<IComment>(swrKeys.comments, {
    method: "POST",
    body: JSON.stringify({ content, course_id: courseId }),
  });
}

export function addReply(commentId: number, content: string) {
  return fetcher<IComment>(`${swrKeys.comment(commentId)}reply/`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function likeComment(commentId: number) {
  return fetcher<{ status: string }>(`${swrKeys.comment(commentId)}like/`, {
    method: "POST",
  });
}

export function editComment(commentId: number, content: string) {
  return fetcher<IComment>(`${swrKeys.comment(commentId)}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
}

export function deleteComment(commentId: number) {
  return fetcher<void>(`${swrKeys.comment(commentId)}`, {
    method: "DELETE",
  });
}
