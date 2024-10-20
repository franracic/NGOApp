import { INewResource, IResource } from "@/typings/course";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export function newResources(resource: INewResource) {
  return fetcher<IResource>(swrKeys.resources, {
    method: "POST",
    body: JSON.stringify(resource),
  });
}

export function getResources() {
  return fetcher<IResource[]>(swrKeys.resources, {
    method: "GET",
  });
}

export function getResource(id: number) {
  return fetcher<IResource>(swrKeys.resource(id), {
    method: "GET",
  });
}

export function updateResource(resource: IResource) {
  return fetcher<IResource>(swrKeys.resource(resource.id), {
    method: "PUT",
    body: JSON.stringify(resource),
  });
}

export function likeResource(resourceId: number, userId: number) {
  return fetcher<IResource>(`${swrKeys.resource(resourceId)}like/`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export function incrementResourceViews(resourceId: number) {
  return fetcher<IResource>(`${swrKeys.resource(resourceId)}increment_views/`, {
    method: "POST",
  });
}
