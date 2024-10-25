"use client";
import { Hero } from "@/components/core/Hero/Hero";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ITrophy, IUserInput } from "@/typings/course";
import { Box, Flex, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { TrophyCard } from "../TrophyCard/TrophyCard";
import { UserInputGrid } from "../UserInputGrid/UserInputGrid";

const difficulty = [
  "very easy",
  "easy",
  "medium",
  "hard",
  "very hard",
  "extremely hard",
];

export const InspirationSection = () => {
  const toast = useToast();

  const { data: trophies, error: trophiesError } = useSWR(
    swrKeys.trophyTemplates,
    fetcher<ITrophy[]>
  );
  const { data: userInputs, error: userInputsError } = useSWR(
    swrKeys.userInputs,
    fetcher<IUserInput[]>
  );

  if (trophiesError || userInputsError) return <div>Error loading data.</div>;
  if (!trophies || !userInputs) return <div>Loading...</div>;

  const earnedTrophies = trophies
    .filter((trophy) => trophy.is_earned)
    .sort(
      (b, a) =>
        difficulty.indexOf(a.difficulty) - difficulty.indexOf(b.difficulty)
    );
  const inProgressTrophies = trophies
    .filter((trophy) => !trophy.is_earned)
    .sort(
      (a, b) =>
        difficulty.indexOf(a.difficulty) - difficulty.indexOf(b.difficulty)
    );

  return (
    <Flex direction="column" justifyContent={"center"}>
      <Hero
        headingText={"Inspiration"}
        subheadingText={"Empowering Your Learning Journey"}
        bodyText={
          "Discover insights and challenges that motivate you to achieve greatness."
        }
        img_url="https://images.unsplash.com/photo-1468971050039-be99497410af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <Box p={8} maxW="1200px" mx="auto">
        <Heading mb={8} textAlign="center">
          Your Achievements
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {earnedTrophies.map((trophy: ITrophy) => (
            <TrophyCard {...trophy} />
          ))}
        </SimpleGrid>

        <Heading mb={8} mt={16} textAlign="center">
          In Progress
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {inProgressTrophies.map((trophy: ITrophy) => (
            <TrophyCard {...trophy} />
          ))}
        </SimpleGrid>
        <Heading mt={8} textAlign="center">
          User Inputs
        </Heading>

        <UserInputGrid inputs={userInputs} />
      </Box>
    </Flex>
  );
};
