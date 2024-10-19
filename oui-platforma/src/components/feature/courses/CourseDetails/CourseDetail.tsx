import { ICourse } from "@/typings/course";
import { Box, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";

export const CourseDetails = ({
  title,
  description,
  cover_image: image_url,
  average_rating,
}: ICourse) => {
  const placeholderImage = "https://fakeimg.pl/600x400?text=No+course+image";

  return (
    <Card overflow="hidden" variant="light">
      <Box position="relative" width="100%" height="400px">
        <Image
          src={image_url || placeholderImage}
          alt={title}
          objectFit={"cover"}
          h={"100%"}
          w={"100%"}
        />
      </Box>
      <CardBody>
        <Heading size="md">{title}</Heading>
        <Text pt="2">{description}</Text>
        <Text pt="2" fontWeight="bold">
          {average_rating ? `${average_rating.toFixed(1)} / 5` : "No ratings"}
        </Text>
      </CardBody>
    </Card>
  );
};
