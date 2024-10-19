import { IUser } from "@/typings/course";
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdGroups, MdInterests, MdLocationCity, MdWork } from "react-icons/md";

const placeholderImage = "https://fakeimg.pl/600x400?text=No+image";

export const MentorCard = ({
  mentor,
  onMessageClick,
}: {
  mentor: IUser;
  onMessageClick: (string: string) => void;
}) => {
  return (
    <Card
      h={"100%"}
      overflow="hidden"
      flexGrow={1}
      variant="light"
      minWidth={0}
      data-testid="mentor-card"
    >
      <Box position="relative" width="100%" flexGrow={1}>
        <Image
          src={mentor.avatar || placeholderImage}
          alt={mentor.username}
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
            {mentor.username}
          </Heading>
          <Flex alignItems="center" gap={2}>
            <MdWork />
            <Text fontSize="sm">{mentor.jobTitle || "Mentor"}</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <MdLocationCity />
            <Text fontSize="sm">
              {mentor.city || "Unknown City"},
              {mentor.country || "Unknown Country"}
            </Text>
          </Flex>
          <Flex alignItems="center" gap={2} wrap="wrap">
            <MdInterests />
            {mentor.expertise?.map((expertise) => (
              <Tag
                key={expertise}
                size="sm"
                colorScheme="blue"
                borderRadius="full"
              >
                {expertise}
              </Tag>
            ))}
          </Flex>
          <Flex alignItems="center" gap={2}>
            <MdGroups />
            <Text fontSize="sm">{mentor.mentees?.length || 0} Mentees</Text>
          </Flex>
          <Text fontSize="sm" color="gray.500" noOfLines={2}>
            {mentor.bio ||
              "Passionate about mentoring and guiding the next generation of professionals."}
          </Text>
        </VStack>
        <Button variant="solid" colorScheme="yellow" mt={4}>
          Request Mentorship
        </Button>
      </CardBody>
    </Card>
  );
};
