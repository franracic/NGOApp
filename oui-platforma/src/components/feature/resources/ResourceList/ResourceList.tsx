import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IResource, IUser } from "@/typings/course";
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { categoryOptions } from "../ResourceInvite/ResourceInvite";
import { ResourceItem } from "../ResourceItem/ResourceItem";

export const ResourceList = ({ currentUser }: { currentUser: IUser }) => {
  const toast = useToast();
  const { data: resources, error } = useSWR(
    swrKeys.resources,
    fetcher<IResource[]>
  );

  const [filterType, setFilterType] = useState<string>("All");
  const [filterLanguage, setFilterLanguage] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Date");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);

  if (error) {
    toast({
      title: "Error loading resources",
      description: "An error occurred while loading resources.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  if (!resources) return <div>Loading resources...</div>;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLanguage(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
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
      .filter((resource) => {
        const matchesType =
          filterType === "All" ||
          resource.type.toLowerCase() === filterType.toLowerCase();
        const matchesLanguage =
          filterLanguage === "" ||
          resource.language.toLowerCase().includes(filterLanguage);
        const matchesCategory =
          filterCategory === "All" ||
          resource.category.toLowerCase() === filterCategory.toLowerCase();
        const matchesSearch = resource.title
          .toLowerCase()
          .includes(searchQuery);

        return (
          matchesType && matchesLanguage && matchesCategory && matchesSearch
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "Title":
            return a.title.localeCompare(b.title);
          case "Date":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
  };

  const filteredResources = getFilteredResources(resources);
  const likedResources = filteredResources.filter((resource) =>
    resource.likes?.includes(currentUser?.id || 0)
  );

  const recommendedResources = () => {
    if (!currentUser) return [];

    const userTags = currentUser.interests || currentUser.expertise || [];
    const likedResources = filteredResources.filter((resource) =>
      resource.likes?.includes(currentUser.id)
    );

    const matchingResources = filteredResources.filter((resource) => {
      const matchesTags = resource.tags?.some((tag) => userTags.includes(tag));
      const isLiked = likedResources.includes(resource);
      return !isLiked && matchesTags;
    });

    if (matchingResources.length < 5) {
      const additionalResources = filteredResources
        .filter((resource) => {
          return (
            !matchingResources.includes(resource) &&
            !likedResources.includes(resource)
          );
        })
        .sort((a, b) => b.views - a.views)
        .slice(0, 5 - matchingResources.length);
      return [...matchingResources, ...additionalResources];
    }

    return matchingResources;
  };

  const recommendedResourcesList = recommendedResources();

  const officialResources = filteredResources.filter(
    (resource) => resource.isOfficial && !likedResources.includes(resource)
  );

  const peerAddedResources = filteredResources.filter(
    (resource) => !resource.isOfficial && !likedResources.includes(resource)
  );

  const paginate = (items: IResource[]) => {
    return items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  };

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
              <option value="All">All Types</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Pdf">Pdf</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <Input
              placeholder="Filter by language"
              value={filterLanguage}
              onChange={handleLanguageChange}
            />
          </FormControl>

          <FormControl>
            <Select value={filterCategory} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
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
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Liked Resources */}
      {currentUser && likedResources.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>
            Resources You Liked
          </Heading>
          <SimpleGrid columns={[2, 4, 5]} spacing={6}>
            {paginate(likedResources).map((resource) => (
              <ResourceItem {...resource} key={resource.id} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Recommended Resources */}
      {currentUser && recommendedResourcesList.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>
            Recommended for You
          </Heading>
          <SimpleGrid columns={[2, 4, 5]} spacing={6}>
            {paginate(recommendedResourcesList).map((resource) => (
              <ResourceItem {...resource} key={resource.id} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Official Resources */}
      {officialResources.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>
            Official Resources
          </Heading>
          <SimpleGrid columns={[2, 4, 5]} spacing={6}>
            {paginate(officialResources).map((resource) => (
              <ResourceItem {...resource} key={resource.id} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Peer Added Resources */}
      {peerAddedResources.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>
            Resources Shared by Peers
          </Heading>
          <SimpleGrid columns={[2, 4, 5]} spacing={6}>
            {paginate(peerAddedResources).map((resource) => (
              <ResourceItem {...resource} key={resource.id} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Pagination Controls */}
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
          isDisabled={currentPage * itemsPerPage >= filteredResources.length}
          variant="solid"
          colorScheme="yellow"
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
};
