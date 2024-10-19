import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IResource, IUser } from "@/typings/course";
import {
  Avatar,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaBook, FaFilePdf, FaLink, FaVideo } from "react-icons/fa";
import useSWR from "swr";

export const ResourceItem = ({
  title,
  description,
  type,
  link,
  createdBy,
  createdAt,
  tags,
}: IResource) => {
  const toast = useToast();

  const { data: userData, error } = useSWR(
    createdBy ? swrKeys.userInfo(createdBy) : null,
    fetcher<IUser>
  );

  if (error) {
    toast({
      title: "Error loading user data",
      description: "An error occurred while loading author information.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  const renderIcon = () => {
    switch (type.toLowerCase()) {
      case "video":
        return <Icon as={FaVideo} color="yellowDark" boxSize={6} />;
      case "pdf":
        return <Icon as={FaFilePdf} color="yellowDark" boxSize={6} />;
      case "article":
        return <Icon as={FaBook} color="yellowDark" boxSize={6} />;
      default:
        return <Icon as={FaLink} color="yellowDark" boxSize={6} />;
    }
  };

  return (
    <Card mb={8} p={4}>
      <VStack spacing={4} alignItems="flex-start">
        <Flex alignItems={"center"} gap={5}>
          {renderIcon()}
          <Heading size="md">{title}</Heading>
        </Flex>
        <VStack align="start" spacing={2} flex="1">
          <Text color="gray.600">{description}</Text>
          <Link
            href={link}
            color="yellowDark"
            isExternal
            textDecoration="underline"
          >
            Visit Resource
          </Link>
          {tags && (
            <HStack wrap="wrap" spacing={2} mt={2}>
              {tags.map((tag, index) => (
                <Text
                  key={index}
                  fontSize="xs"
                  color="white"
                  bg="gray.700"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {tag}
                </Text>
              ))}
            </HStack>
          )}
          <Divider my={4} />
          <HStack spacing={2} alignItems="center">
            {userData ? (
              <Tooltip
                label={
                  <VStack align="start">
                    <HStack spacing={2}>
                      <Avatar size="sm" src={userData.avatar} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{userData.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {userData.jobTitle}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" mt={2} color="gray.600">
                      {userData.bio}
                    </Text>
                  </VStack>
                }
                aria-label="Author Info"
                hasArrow
                placement="top"
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.700"
                  cursor="pointer"
                >
                  {userData.name}
                </Text>
              </Tooltip>
            ) : (
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="gray.700"
                cursor="pointer"
              >
                Loading author...
              </Text>
            )}
            <Text fontSize="xs" color="gray.500">
              • {new Date(createdAt).toLocaleDateString()}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};
