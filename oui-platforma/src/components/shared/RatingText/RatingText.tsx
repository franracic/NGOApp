import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingTextProps {
  average_rating: number | undefined;
  no_of_reviews: number | undefined;
}

const RatingText: React.FC<RatingTextProps> = ({
  average_rating,
  no_of_reviews,
}) => {
  return (
    <HStack>
      <FaStar />
      <Text fontSize="sm">
        {average_rating ? (
          <>
            <Text as={"span"} fontWeight="bold" fontSize={"md"}>
              {average_rating}/5
            </Text>{" "}
            <Text as={"span"} color={"gray.600"}>
              ({no_of_reviews ?? 0} ratings)
            </Text>
          </>
        ) : (
          "No rating"
        )}
      </Text>
    </HStack>
  );
};

export default RatingText;
