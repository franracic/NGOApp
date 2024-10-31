import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IResource } from "@/typings/course";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { ResourceItem } from "../../resources/ResourceItem/ResourceItem";

interface ResourcesSectionProps {
  resourceIds: number[];
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceIds,
}) => {
  const { data, error, isLoading } = useSWR(
    resourceIds.length > 0 ? swrKeys.multipleResources : null,
    () =>
      fetcher<IResource[]>(swrKeys.multipleResources, {
        method: "POST",
        body: JSON.stringify({ ids: resourceIds }),
      })
  );

  const resources = resourceIds.length > 0 ? data : [];

  if (error) return <Text>Error loading resources</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  if (!resources) return <Text>No resources available</Text>;

  return (
    <Box mt={1} p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceItem {...resource} key={resource.id} />
          ))
        ) : (
          <Text>No resources available</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};
