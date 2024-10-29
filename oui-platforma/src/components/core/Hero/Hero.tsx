import { Box, Heading, Text } from "@chakra-ui/react";

interface IHero {
  headingText: string;
  subheadingText: string;
  bodyText: string;
  img_url: string;
}

export const Hero = ({
  headingText,
  subheadingText,
  bodyText,
  img_url,
}: IHero) => {
  return (
    <Box
      position="relative"
      bgImage={`url(${img_url})`}
      bgSize="cover"
      bgPos="center"
      flexDirection="column"
      height={{ base: "200px", md: "250px", lg: "250px" }}
      display="flex"
      justifyContent="center"
      color="white"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
        pointerEvents="none"
      />

      <Box
        p={{ base: 4, md: 8, lg: 10 }}
        position="relative"
        zIndex={2}
        maxW="1200px"
        mx="auto"
        textAlign="center"
      >
        <Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
          {headingText}
        </Heading>
        <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} mt={4}>
          {subheadingText}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} mt={2}>
          {bodyText}
        </Text>
      </Box>
    </Box>
  );
};
