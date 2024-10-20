// components/ResourceItem.tsx
import { fetcher } from "@/fetchers/fetcher";
import { incrementResourceViews, likeResource } from "@/fetchers/resources";
import { swrKeys } from "@/fetchers/swrKeys";
import { IResource, IUser } from "@/typings/course";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Tag,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaBook,
  FaBusinessTime,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaEye,
  FaFilePdf,
  FaGlobe,
  FaHeart,
  FaHeartbeat,
  FaLaptopCode,
  FaLeaf,
  FaLink,
  FaPalette,
  FaRegHeart,
  FaVideo,
} from "react-icons/fa";
import useSWR from "swr";

export const ResourceItem = ({
  id,
  title,
  description,
  type,
  link,
  createdBy,
  createdAt,
  tags,
  views,
  language,
  category,
  likes,
  isOfficial,
}: IResource) => {
  const toast = useToast();
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);

  const [isLiked, setIsLiked] = useState<boolean>(
    likes?.includes(currentUser?.id || 0)
  );
  const [likesCount, setLikesCount] = useState<number>(likes?.length || 0);

  const { mutate } = useSWR(swrKeys.resources);

  const handleLike = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to like resources.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (isLiked) {
        await likeResource(id, currentUser.id);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await likeResource(id, currentUser.id);
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your like.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleView = async () => {
    try {
      await incrementResourceViews(id);
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the view count.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const categoryIcons: { [key: string]: any } = {
    Education: FaBook,
    Technology: FaLaptopCode,
    Health: FaHeartbeat,
    Science: FaGlobe,
    Arts: FaPalette,
    Business: FaBusinessTime,
    Environment: FaLeaf,
    Other: FaLink,
  };

  const renderCategoryIcon = () => {
    const IconComponent = categoryIcons[category] || FaLink;
    return <Icon as={IconComponent} color="blue.500" boxSize={5} />;
  };

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
  console.log(createdBy.avatar);
  return (
    <Card mb={8} p={4}>
      <VStack spacing={4} alignItems="flex-start" width="100%">
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Flex alignItems="center" gap={3} flex="1" minWidth="0">
            {renderIcon()}
            <Tooltip label={title} hasArrow placement="top">
              <Heading size="md" isTruncated>
                {title}
              </Heading>
            </Tooltip>
          </Flex>
          <IconButton
            icon={
              isLiked ? (
                <Icon as={FaHeart} color="red.500" />
              ) : (
                <Icon as={FaRegHeart} color="gray.500" />
              )
            }
            aria-label="Like"
            variant="ghost"
            colorScheme="red"
            onClick={handleLike}
            size="md"
            isRound
            _hover={{ transform: "scale(1.1)" }}
            _active={{ transform: "scale(0.9)" }}
            transition="all 0.2s"
          />
        </Flex>
        <VStack align="start" spacing={2} flex="1" width="100%">
          <Text color="gray.600">{description}</Text>
          <HStack spacing={2} alignItems={"stretch"}>
            <Tooltip label="Open in new tab" hasArrow placement="top">
              <IconButton
                icon={<FaExternalLinkAlt />}
                as={Link}
                href={link}
                isExternal
                onClick={handleView}
                bgColor="yellowDark"
                color={"white"}
                size={"sm"}
                aria-label={""}
              />
            </Tooltip>
            {language && (
              <Tag size="sm" colorScheme="purple" fontWeight={"bold"}>
                {language}
              </Tag>
            )}
          </HStack>
          <HStack spacing={4} mt={2} alignItems={"flex-start"}>
            <HStack spacing={1}>
              <Icon as={FaEye} color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {views}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FaHeart} color={isLiked ? "red.500" : "gray.500"} />
              <Text fontSize="sm" color="gray.500">
                {likesCount}
              </Text>
            </HStack>
            {category && (
              <Tooltip label={category} hasArrow placement="top">
                <Box>{renderCategoryIcon()}</Box>
              </Tooltip>
            )}
            {isOfficial && (
              <Tooltip label="Official Resource" hasArrow placement="top">
                <Box>
                  <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
                </Box>
              </Tooltip>
            )}
          </HStack>
          <HStack wrap="wrap" spacing={2} mt={2} align={"flex-start"}>
            {tags &&
              tags.map((tag, index) => (
                <Tag key={index} size="sm" colorScheme="gray">
                  {tag}
                </Tag>
              ))}
          </HStack>
          <Box w="100%">
            <Divider my={4} />
            <HStack spacing={2} alignItems="center">
              {createdBy ? (
                <Tooltip
                  label={
                    <VStack align="start">
                      <HStack spacing={2}>
                        <Avatar size="sm" src={createdBy.avatar} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">{createdBy.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {createdBy.jobTitle}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" mt={2} color="gray.600">
                        {createdBy.bio}
                      </Text>
                    </VStack>
                  }
                  aria-label="Author Info"
                  hasArrow
                  placement="top"
                >
                  <HStack spacing={1} cursor="pointer">
                    <Avatar size="xs" src={createdBy.avatar} />
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">
                      {createdBy.name}
                    </Text>
                  </HStack>
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
          </Box>
        </VStack>
      </VStack>
    </Card>
  );
};
