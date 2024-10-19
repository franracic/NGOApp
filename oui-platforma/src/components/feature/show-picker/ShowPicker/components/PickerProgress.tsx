// import { Heading, Progress } from "@chakra-ui/react";
// import { useContext } from "react";
// import { PickerContext } from "./PickerContextProvider";

// export const PickerProgress = () => {
//   const { currentStep, showList, steps, totalSteps } =
//     useContext(PickerContext);

//   if (!showList || (showList?.length ?? 0) === 1) {
//     return null;
//   }
//   const progress = ((currentStep + totalSteps) / steps) * 100;

//   return (
//     <>
//       <Heading size="sm">
//         Step {currentStep + 1 + totalSteps} of {steps}
//       </Heading>
//       <Progress value={progress} />
//     </>
//   );
// };
