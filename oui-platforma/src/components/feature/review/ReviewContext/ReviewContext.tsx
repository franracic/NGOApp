// import { IReview } from "@/typings/show";
// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useState,
// } from "react";

// interface IReviewContext {
//   hasNotification: boolean;
//   setHasNotification: Dispatch<SetStateAction<boolean>>;
//   newReviews: IReview[];
//   setNewReviews: Dispatch<SetStateAction<Array<IReview>>>;
// }

// export const ReviewContext = createContext<IReviewContext>(
//   {} as IReviewContext
// );

// export const ReviewContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [hasNotification, setHasNotification] = useState(false);
//   const [newReviews, setNewReviews] = useState<Array<IReview>>([]);
//   return (
//     <ReviewContext.Provider
//       value={{
//         hasNotification,
//         setHasNotification,
//         newReviews,
//         setNewReviews,
//       }}
//     >
//       {children}
//     </ReviewContext.Provider>
//   );
// };
