import { SimpleGrid } from "@chakra-ui/react";
import { UserInputCard } from "../UserInputCard/UserInputCard";

interface UserInputGridProps {
  inputs: { title?: string; content: string; bgColor?: string }[];
}

export const UserInputGrid: React.FC<UserInputGridProps> = ({ inputs }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6} p={4}>
      {inputs.map((input, index) => (
        <UserInputCard key={index} {...input} />
      ))}
    </SimpleGrid>
  );
};
