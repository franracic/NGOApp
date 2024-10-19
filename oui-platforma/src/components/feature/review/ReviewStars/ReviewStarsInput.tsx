import { StarIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface IReviewStarsInput {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const ReviewStarsInput = ({ value, onChange }: IReviewStarsInput) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <Flex gap={5} alignItems="center" data-testid="rating-input">
      <Flex
        alignItems="center"
        gap={1}
        onMouseLeave={() => setHoverValue(null)}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isChecked = index < value;
          const isHovered = hoverValue !== null && index < hoverValue;

          const color = isChecked || isHovered ? "yellow.400" : "gray.300";

          return (
            <StarIcon
              key={index}
              boxSize={20}
              cursor="pointer"
              color={color}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoverValue(starValue)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
