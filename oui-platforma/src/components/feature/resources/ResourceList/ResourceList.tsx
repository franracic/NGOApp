"use client";

import { IResource } from "@/typings/course";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ResourceItem } from "../ResourceItem/ResourceItem";

export const ResourceList = ({ resources }: { resources: IResource[] }) => {
  const [filterType, setFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Date");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const getFilteredResources = (resources: IResource[]) => {
    return resources
      .filter(
        (resource) =>
          (filterType === "All" ||
            resource.type.toLowerCase() === filterType.toLowerCase()) &&
          resource.title.toLowerCase().includes(searchQuery)
      )
      .sort((a, b) => {
        switch (sortOption) {
          case "Title":
            return a.title.localeCompare(b.title);
          case "Date":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "Level":
            return a.level - b.level;
          default:
            return 0;
        }
      });
  };

  const filteredResources = getFilteredResources(resources);

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Flex
      color={"black"}
      direction={"column"}
      justifyContent={"center"}
      mb={"100px"}
      p={6}
    >
      <Card
        variant={"light"}
        p={6}
        mb={6}
        w={"700px"}
        alignSelf={"center"}
        maxW={"90vw"}
      >
        <Heading color={"yellowDark"} size={"sm"}>
          Tools for Change
        </Heading>
        <Heading size={"lg"}>Empowering Youth Work Innovation</Heading>
        <Text color={"gray.500"} mb={6}>
          Explore practical tools and strategies that enhance your work with
          youth. Collaborate and innovate to drive impactful change in the STEAM
          field.
        </Text>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
          <FormControl>
            <Select value={filterType} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Pdf">Pdf</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <Input
              placeholder="Search by title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>

          <FormControl>
            <Select value={sortOption} onChange={handleSortChange}>
              <option value="Date">Date</option>
              <option value="Title">Title</option>
              <option value="Level">Level</option>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {paginatedResources.length > 0 ? (
        <>
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={6}>
            {paginatedResources.map((resource) => (
              <ResourceItem {...resource} key={resource.link} />
            ))}
          </SimpleGrid>

          <HStack justifyContent="center" mt={6}>
            <Button
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
              variant="solid"
              colorScheme="yellow"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              isDisabled={
                currentPage * itemsPerPage >= filteredResources.length
              }
              variant="solid"
              colorScheme="yellow"
            >
              Next
            </Button>
          </HStack>
        </>
      ) : (
        <Box>
          <Text>No resources found with the current filters.</Text>
        </Box>
      )}
    </Flex>
  );
};
