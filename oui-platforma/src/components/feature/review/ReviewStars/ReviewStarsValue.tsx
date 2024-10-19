import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex } from "@chakra-ui/react";

export const ReviewStarsValue = ({ value }: { value: number | undefined }) => {
  return (
    <Box>
      {!value ? (
        <Badge
          colorScheme="purple"
          borderRadius={"ratingRadius"}
          padding={1}
          data-testid="rating-badge"
        >
          No Ratings
        </Badge>
      ) : (
        <Flex align={"center"}>
          <Badge
            colorScheme="purple"
            borderRadius={"ratingRadius"}
            padding={1}
            marginRight={2}
            data-testid="rating-badge"
          >
            {`${value % 1 === 0 ? value : value.toFixed(2)}/5`}
          </Badge>
          {Array.from({ length: value }, (_, index) => {
            return <StarIcon key={index} boxSize={10} />;
          })}
          <Flex width={`${(value % 1) * 16}px`} overflow={"hidden"}>
            <StarIcon />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
