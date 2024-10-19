import { IUser } from "@/typings/course";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdInterests, MdLocationCity, MdMessage, MdWork } from "react-icons/md";

const placeholderImage = "https://fakeimg.pl/600x400?text=No+show+image";

export const UserCard = ({
  user,
  onMessageClick,
}: {
  user: IUser;
  onMessageClick: (string: string) => void;
}) => {
  return (
    <Card
      h={"100%"}
      overflow="hidden"
      flexGrow={1}
      variant="light"
      minWidth={0}
      data-testid="show-card"
    >
      <Box position="relative" width="100%" flexGrow={1}>
        <Image
          src={user.avatar || placeholderImage}
          alt={user.username}
          sizes="(max-width: 768px) 25vw"
          h={"220px"}
          w={"100%"}
          p={2}
          borderRadius={"24px"}
          sx={{ objectFit: "cover" }}
        />
      </Box>
      <CardBody color="brand.800" flexGrow={0} alignSelf={"center"}>
        <VStack align="start" spacing={2}>
          <Heading size="md" noOfLines={1}>
            {user.username}
          </Heading>
          <Flex alignItems="center" gap={2}>
            <MdWork />
            <Text fontSize="sm">{user.jobTitle || "Software Engineer"}</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <MdLocationCity />
            <Text fontSize="sm">
              {user.city || "San Francisco"},{user.country || "CA"}
            </Text>
          </Flex>
          <Flex alignItems="center" gap={2} wrap="wrap">
            <MdInterests />
            {user.interests?.map((interest) => (
              <Tag
                key={interest}
                size="sm"
                colorScheme="yellow"
                borderRadius="full"
              >
                {interest}
              </Tag>
            ))}
          </Flex>
          <Text fontSize="sm" color="gray.500" noOfLines={2}>
            {user.bio ||
              "Passionate about technology and building innovative solutions."}
          </Text>
        </VStack>
        <HStack p={1}>
          <Button
            aria-label="message"
            variant={"light"}
            p={2}
            h={"100%"}
            onClick={() => onMessageClick(user.username)}
          >
            <MdMessage color="white" />
          </Button>
          <Button variant={"light"} size={"sm"} alignSelf={"center"}>
            View Profile
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
