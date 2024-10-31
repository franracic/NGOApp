// "use client";
// import { initialTrophyData } from "@/components/feature/inspiration/InspirationSection/InspirationSection";
// import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";

// export const CompactAchievementsSummary = () => {
//   const textColor = "gray.800";

//   return (
//     <Box p={2} bg="white" shadow="sm" borderRadius="md" w="full">
//       <Flex align="center" justify="space-between" px={4} py={6}>
//         <Flex align="center">
//           <Box position="relative" p={3} bg="yellow.100" rounded="full">
//             <Icon as={initialTrophyData[0].icon} />
//           </Box>
//           <Text
//             ml={2}
//             fontSize="sm"
//             fontWeight="semibold"
//             color={textColor}
//             borderBottom="1px solid"
//             borderColor="gray.200"
//           >
//             Achievements
//           </Text>
//         </Flex>
//       </Flex>
//       <HStack spacing={2} px={4} py={2}>
//         {initialTrophyData.slice(0, 3).map((trophy) => (
//           <Icon
//             key={trophy.id}
//             as={trophy.icon}
//             boxSize={5}
//             color="yellow.500"
//           />
//         ))}
//       </HStack>
//     </Box>
//   );
// };
