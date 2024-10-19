// import { ShowCard } from "@/components/feature/shows/ShowCard/ShowCard";
// import { IShow } from "@/typings/show";
// import { Grid, GridItem } from "@chakra-ui/react";
// import { useContext } from "react";
// import { PickerContext } from "./PickerContextProvider";
// import { PickerResult } from "./PickerResult";

// export const PickerStep = () => {
//   const {
//     currentStep,
//     showList,
//     setCurrentStep,
//     selectedShows,
//     setSelectedShows,
//   } = useContext(PickerContext);

//   const pickShow = (show: IShow) => {
//     const newSelectedShows = [...selectedShows];
//     newSelectedShows[currentStep] = show;
//     setSelectedShows(newSelectedShows);
//     setCurrentStep(currentStep + 1);
//   };

//   if (!showList) {
//     return null;
//   }

//   if (showList.length === 1) {
//     return <PickerResult />;
//   }

//   return (
//     <Grid
//       templateColumns={{
//         base: "repeat(1, 1fr)",
//         md: "repeat(3, 1fr)",
//       }}
//       gap={6}
//     >
//       {Array.from(showList)
//         .slice(currentStep * 3, currentStep * 3 + 3)
//         .map((show) => (
//           <GridItem
//             key={show.id}
//             w="100%"
//             h="400"
//             minW={0}
//             onClick={() => pickShow(show)}
//           >
//             <ShowCard {...show} link={false} />
//           </GridItem>
//         ))}
//     </Grid>
//   );
// };
