// import { getShows } from "@/fetchers/show";
// import { swrKeys } from "@/fetchers/swrKeys";
// import { IShow } from "@/typings/show";
// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useState,
// } from "react";
// import useSWR from "swr";

// interface IPickerContext {
//   currentStep: number;
//   setCurrentStep: Dispatch<SetStateAction<number>>;
//   selectedShows: Array<IShow>;
//   setSelectedShows: Dispatch<SetStateAction<Array<IShow>>>;
//   showList?: Array<IShow>;
//   setShowList: Dispatch<SetStateAction<Array<IShow> | undefined>>;
//   setIsDataSet: Dispatch<SetStateAction<boolean>>;
//   steps: number;
//   totalSteps: number;
//   setTotalSteps: Dispatch<SetStateAction<number>>;
// }

// export const PickerContext = createContext<IPickerContext>(
//   {} as IPickerContext
// );

// export const PickerContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedShows, setSelectedShows] = useState<Array<IShow>>([]);
//   const { data } = useSWR(swrKeys.listShows, getShows);
//   const [showList, setShowList] = useState(data?.shows);
//   const [isDataSet, setIsDataSet] = useState(false);
//   const [steps, setSteps] = useState(0);
//   const [totalSteps, setTotalSteps] = useState(0);

//   useEffect(() => {
//     if (data?.shows && !isDataSet) {
//       setShowList(data.shows);
//       setIsDataSet(true);
//       let calculatedSteps = 0;
//       let length = data.shows.length ?? 0;
//       while (length > 1) {
//         length = Math.ceil(length / 3);
//         calculatedSteps += length;
//       }
//       setSteps(calculatedSteps);
//     }
//   }, [data?.shows, isDataSet]);

//   useEffect(() => {
//     const totalStepsNow = Math.ceil((showList?.length ?? 0) / 3);
//     if (currentStep > 0 && currentStep >= totalStepsNow) {
//       setShowList(selectedShows);
//       setSelectedShows([]);
//       setTotalSteps(totalSteps + currentStep);
//       setCurrentStep(0);
//     }
//   }, [currentStep, selectedShows, showList, totalSteps]);

//   return (
//     <PickerContext.Provider
//       value={{
//         currentStep,
//         setCurrentStep,
//         selectedShows,
//         setSelectedShows,
//         showList,
//         setShowList,
//         setIsDataSet,
//         steps,
//         totalSteps,
//         setTotalSteps,
//       }}
//     >
//       {children}
//     </PickerContext.Provider>
//   );
// };
