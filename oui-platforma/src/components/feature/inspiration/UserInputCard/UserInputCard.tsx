import { Box, Heading, Text } from "@chakra-ui/react";

interface UserInputCardProps {
  title?: string;
  content: string;
  bgColor?: string;
}

export const UserInputCard: React.FC<UserInputCardProps> = ({
  title,
  content,
  bgColor = "white",
}) => {
  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      boxShadow="lg"
      maxW="300px"
      minH="150px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {title && (
        <Heading as="h4" size="md" mb={2} color="gray.700">
          {title}
        </Heading>
      )}
      <Text color="gray.800">{content}</Text>
    </Box>
  );
};
