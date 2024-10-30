// components/GroupList/GroupList.tsx

"use client";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IGroup, IUser } from "@/typings/course";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import { GroupDetails } from "../GroupDetails/GroupDetails";
import { NewGroupForm } from "../NewGroupForm/NewGroupForm";

export const GroupList = () => {
  const { data: groups, mutate } = useSWR(swrKeys.groups, fetcher<IGroup[]>);
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  return (
    <VStack spacing={8}>
      {(currentUser?.role === "admin" || currentUser?.role === "mentor") && (
        <NewGroupForm />
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} w={"full"}>
        {groups?.map((group) => (
          <GroupDetails key={group.id} group={group} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
