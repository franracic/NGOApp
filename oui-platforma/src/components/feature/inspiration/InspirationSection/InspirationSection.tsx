"use client";
import { Hero } from "@/components/core/Hero/Hero";
import { IChallenge, ITrophy } from "@/typings/course";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAward, FaCertificate, FaMedal, FaTrophy } from "react-icons/fa";
import { TrophyCard } from "../TrophyCard/TrophyCard";
import { UserInputGrid } from "../UserInputGrid/UserInputGrid";

const challengesData: IChallenge[] = [
  {
    id: 1,
    title: "30 Days of Code",
    description: "Complete 30 coding challenges in 30 days.",
    status: "In Progress",
    progress: 50,
    level: 2,
  },
  {
    id: 2,
    title: "Read 5 Books",
    description: "Finish reading 5 programming books.",
    status: "Not Started",
    progress: 0,
    level: 5,
  },
  {
    id: 3,
    title: "Contribute to Open Source",
    description: "Make 3 contributions to open-source projects.",
    status: "In Progress",
    progress: 30,
    level: 10,
  },
];

export const initialTrophyData: ITrophy[] = [
  {
    id: 1,
    title: "Profile Completed",
    description: "Completed 100% of your profile.",
    icon: FaMedal,
    progress: 100,
    isEarned: true,
  },
  {
    id: 2,
    title: "5 Years of Experience",
    description: "Marked 5 years in your current field.",
    icon: FaTrophy,
    progress: 80,
    isEarned: false,
  },
  {
    id: 3,
    title: "Top Contributor",
    description: "Recognized as a top contributor in the community.",
    icon: FaAward,
    progress: 60,
    isEarned: false,
  },
  {
    id: 4,
    title: "Certified Professional",
    description: "Earned a professional certification.",
    icon: FaCertificate,
    progress: 40,
    isEarned: false,
  },
];

export const InspirationSection = () => {
  const [challenges, setChallenges] = useState<IChallenge[]>(challengesData);
  const [trophies, setTrophies] = useState<ITrophy[]>(initialTrophyData);
  const [earnedTrophies, setEarnedTrophies] = useState<ITrophy[]>([]);
  const toast = useToast();

  const handleCompleteChallenge = (challengeId: number) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === challengeId
        ? { ...challenge, progress: 100, status: "Complete" }
        : challenge
    );
    setChallenges(updatedChallenges);

    const updatedTrophies = trophies.map((trophy) => {
      if (trophy.progress <= 100 && !trophy.isEarned) {
        const newProgress = trophy.progress + 20;
        if (newProgress >= 100) {
          showTrophyPopup(trophy);
          return { ...trophy, progress: 100, isEarned: true };
        }
        return { ...trophy, progress: newProgress };
      }
      return trophy;
    });

    setTrophies(updatedTrophies);
  };

  const showTrophyPopup = (trophy: ITrophy) => {
    setEarnedTrophies((prev) => [...prev, trophy]);
    toast({
      position: "bottom",
      duration: 3000,
      render: () => (
        <Box
          p={3}
          bg="yellow.400"
          color="white"
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          <Heading size="md">{trophy.title} Unlocked!</Heading>
          <Text>{trophy.description}</Text>
        </Box>
      ),
    });
  };

  useEffect(() => {
    const earned = trophies.filter((trophy) => trophy.isEarned);
    setEarnedTrophies(earned);
  }, [trophies]);

  const userInputs = [
    {
      title: "Maria Lopez - Spain",
      content:
        "I teach mathematics to middle school students. Last year, one of my students, Alejandro, struggled with understanding algebraic concepts. He was frustrated, and his grades reflected his lack of confidence. I decided to introduce a project-based learning module, where students could see the real-life applications of algebra in architecture and design. Alejandro took this project to heart, creating a scale model of a building that required precise calculations. Not only did he excel in the project, but his newfound interest in mathematics also improved his overall performance. Seeing students like Alejandro connect with the subject matter on a deeper level is what motivates me every day.",
      bgColor: "gray.100",
    },
    {
      title: "Emily Zhang - USA",
      content:
        "As a chemistry teacher, my biggest motivation comes from the curiosity and engagement of my students. Last semester, we conducted an experiment to create biodegradable plastics. One of my students, Jessica, was particularly interested in the environmental impact of plastics. She took the initiative to research further and presented a comprehensive report on how these biodegradable alternatives could be implemented in our local community. Jessica’s passion and initiative inspired the entire class, leading to a school-wide project on reducing plastic waste. It’s moments like these that remind me why I love teaching.",
      bgColor: "white",
    },
    {
      title: "Rajesh Kumar - India",
      content:
        "I’ve been teaching physics for over 15 years, and I’ve always believed in the importance of hands-on learning. A few years ago, I introduced a robotics club at our school. One of my students, Aisha, who had been indifferent to science classes, found her passion through building robots. She went from being an average student to winning national competitions in robotics. Aisha is now pursuing engineering in a top university. Her transformation and success are what keep me motivated to innovate and inspire my students.",
      bgColor: "yellow.100",
    },
    {
      title: "Lina Johansson - Sweden",
      content:
        "I teach biology, and what motivates me is the enthusiasm my students show when they connect what they learn in the classroom to the real world. For example, my student Erik was always interested in plants but never saw himself as a 'science person.' After a field trip to a local botanical garden, he was inspired to start a community garden project, applying the concepts we learned in class. His project not only helped him understand biology better but also brought together students and teachers across different subjects. This kind of interdisciplinary impact is why I’m passionate about teaching STEM.",
      bgColor: "yellow.200",
    },
    {
      title: "Ahmed Hassan - Egypt",
      content:
        "Teaching computer science has been a rewarding experience, especially when I see students develop practical skills that they can apply in their lives. Last year, I guided a group of students through a programming course, and one of them, Omar, built an app to help local farmers monitor crop health. His project won first place in a national competition, and he is now working with a tech company to further develop the app. Seeing my students achieve such great things motivates me to continue exploring new ways to engage them with technology.",
      bgColor: "gray.200",
    },
  ];

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
          User Inputs
        </Heading>

        <UserInputGrid inputs={userInputs} />

        <Heading mb={8} mt={16} textAlign="center">
          Your Achievements
        </Heading>

        <Grid templateColumns="repeat(3, minmax(300px, 1fr))" gap={6}>
          {earnedTrophies.map((trophy: ITrophy) => (
            <TrophyCard
              key={trophy.id}
              title={trophy.title}
              description={trophy.description}
              icon={trophy.icon}
              progress={trophy.progress}
              isEarned={trophy.isEarned}
            />
          ))}
        </Grid>

        <Heading mb={8} mt={16} textAlign="center">
          In Progress
        </Heading>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {trophies
            .filter((trophy) => !trophy.isEarned)
            .map((trophy) => (
              <TrophyCard
                key={trophy.id}
                title={trophy.title}
                description={trophy.description}
                icon={trophy.icon}
                progress={trophy.progress}
                isEarned={trophy.isEarned}
              />
            ))}
        </Grid>

        <Heading mb={8} mt={16} textAlign="center">
          Learning Challenges
        </Heading>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {challenges.map((challenge) => (
            <Box
              key={challenge.id}
              p={6}
              bg={"white"}
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            >
              <VStack align="start" spacing={4}>
                <Heading size="md">{challenge.title}</Heading>
                <Text>{challenge.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  Status: {challenge.status}
                </Text>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  isDisabled={challenge.progress === 100}
                >
                  Mark as Complete
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};
