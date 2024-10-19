import { IUser, IGroup, IResource, IEvent } from "@/typings/course";

export const recommendConnections = (
    user: IUser,
    allUsers: IUser[]
  ): IUser[] => {
    return allUsers
      .filter((u) => u.level <= user.level + 1 && u.level >= user.level - 1)
      .filter((u) => u.id !== user.id)
      .slice(0, 5); // Limit to 5 recommendations
  };
  
  export const recommendGroups = (user: IUser, groups: IGroup[]): IGroup[] => {
    return groups
      .filter((group) => group.level <= user.level + 1 && group.level >= user.level - 1)
      .slice(0, 5); // Limit to 5 recommendations
  };
  
  export const recommendResources = (
    user: IUser,
    resources: IResource[]
  ): IResource[] => {
    return resources
      .filter(
        (resource) =>
          resource.level <= user.level + 1 && resource.level >= user.level - 1
      )
      .slice(0, 5); // Limit to 5 recommendations
  };
  
  export const recommendEvents = (user: IUser, events: IEvent[]): IEvent[] => {
    return events
      .filter((event) => event.level <= user.level + 1 && event.level >= user.level - 1)
      .slice(0, 5); // Limit to 5 recommendations
  };
  