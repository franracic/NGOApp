import { IResource } from "@/typings/course";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export function newResources(resource: IResource) {
  return fetcher<{ resource: IResource }>(swrKeys.resources, {
    method: "POST",
    body: JSON.stringify(resource),
  });
}
