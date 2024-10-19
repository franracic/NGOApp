import { Grid } from "@chakra-ui/react";
import { UserInputCard } from "../UserInputCard/UserInputCard";

interface UserInputGridProps {
  inputs: { title?: string; content: string; bgColor?: string }[];
}

export const UserInputGrid: React.FC<UserInputGridProps> = ({ inputs }) => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={6}
      p={4}
    >
      {inputs.map((input, index) => (
        <UserInputCard
          key={index}
          title={input.title}
          content={input.content}
          bgColor={input.bgColor}
        />
      ))}
    </Grid>
  );
};
