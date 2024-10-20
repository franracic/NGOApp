import { fetcher } from "@/fetchers/fetcher";
import { newResources } from "@/fetchers/resources";
import { swrKeys } from "@/fetchers/swrKeys";
import { IResource, IUser } from "@/typings/course";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const ResourceInvite = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch current user
  const { data: currentUser, error: userError } = useSWR(
    swrKeys.currentUser,
    fetcher<IUser>
  );

  // Define initial state for new resource
  const [newResource, setNewResource] = useState<IResource>({
    id: 0,
    title: "",
    description: "",
    link: "",
    level: 1,
    type: "Article",
    createdBy: currentUser ? currentUser.id : 0,
    createdAt: new Date(),
    tags: [],
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  // Handle tags change (comma-separated)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsValue = e.target.value.split(",").map((tag) => tag.trim());
    setNewResource({ ...newResource, tags: tagsValue });
  };

  // Mutation for adding the resource
  const { trigger: addResource } = useSWRMutation(
    swrKeys.resources,
    async () => {
      await newResources({
        ...newResource,
      });
    },
    {
      onSuccess: () => {
        toast({
          title: "Resource Added",
          description: "Your resource has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setNewResource({
          id: 0,
          title: "",
          description: "",
          link: "",
          level: 1,
          type: "Article",
          createdBy: currentUser ? currentUser.id : 0,
          createdAt: new Date(),
          tags: [],
        });
        onClose();
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to add resource. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  // Handle add resource button click
  const handleAddResource = () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add a resource.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    addResource();
  };

  if (userError) {
    toast({
      title: "Error Loading User Data",
      description: "An error occurred while loading user data.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  if (!currentUser) {
    return null; // Prevent rendering until user data is loaded
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        alignItems="center"
        margin="auto"
        mb="50px"
      >
        <Image
          src="https://cdn.b12.io/client_media/gksrF78w/386e5c4e-54be-11ef-a1ab-0242ac110002-photo-1487017159836-4e23ece2e4cf.jpg"
          alt="Laptop on Desk"
          h="400px"
          w="300px"
          objectFit="cover"
          borderRadius="md"
          mb={[4, 0]}
        />

        <Stack spacing={4} maxW="md" pl={[0, 8]} textAlign={["center", "left"]}>
          <Heading as="h3" size="sm" color="yellowDark">
            RESOURCE SHARING
          </Heading>
          <Text fontSize="sm">
            Empower your youth work with our comprehensive resource-sharing
            feature. Discover a vast collection of tools, materials, and
            information tailored to enhance your practice.
          </Text>
          <Button
            variant="outline"
            alignSelf={["center", "flex-start"]}
            colorScheme="whiteAlpha"
            w="40%"
            borderWidth="2px"
            borderColor="white"
            bg="yellowDark"
            color="white"
            _hover={{
              bg: "white",
              color: "yellowDark",
              borderColor: "yellowDark",
            }}
            onClick={onOpen}
          >
            TRY SHARING
          </Button>
        </Stack>
      </Box>

      <Box bg="yellowDark" py={10} px={5}>
        <Flex
          alignItems="center"
          maxW="1200px"
          mx="auto"
          direction={["column", "row"]}
        >
          <Box>
            <Heading as="h2" size="2xl" color="white">
              Let’s share knowledge
            </Heading>
            <Text fontSize="xl" color="white" mt={2}>
              We would love to see your resources shared with the community.
            </Text>
          </Box>
          <Spacer />
          <Button
            variant="outline"
            colorScheme="whiteAlpha"
            size="lg"
            borderWidth="2px"
            borderColor="white"
            color="yellowDark"
            bg="white"
            _hover={{ bg: "transparent", color: "white" }}
            onClick={onOpen}
            mt={[4, 0]}
          >
            SHARE YOUR RESOURCE
          </Button>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contribute a New Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input
                placeholder="Title"
                name="title"
                value={newResource.title}
                onChange={handleInputChange}
              />
              <Textarea
                placeholder="Description"
                name="description"
                value={newResource.description}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Link"
                name="link"
                value={newResource.link}
                onChange={handleInputChange}
              />
              <Select
                name="type"
                value={newResource.type}
                onChange={handleInputChange}
              >
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Pdf">Pdf</option>
                <option value="Other">Other</option>
              </Select>
              <Input
                type="number"
                placeholder="Level"
                name="level"
                value={newResource.level}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Tags (comma-separated)"
                name="tags"
                value={newResource.tags?.join(", ")}
                onChange={handleTagsChange}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" onClick={handleAddResource}>
              Add Resource
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
