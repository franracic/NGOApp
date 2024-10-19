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
      bgImage={img_url}
      bgSize="cover"
      flexDirection="column"
      height="300px"
      display="flex"
      color="white"
      justifyContent="center"
      bgPos={"center"}
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
      <Box p={10} position="relative" zIndex={2}>
        <Heading fontSize="6xl">{headingText}</Heading>
        <Heading fontSize="3xl" mt={4}>
          {subheadingText}
        </Heading>
        <Text fontSize="lg">{bodyText}</Text>
      </Box>
    </Box>
  );
};
