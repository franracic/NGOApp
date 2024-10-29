// "use client";
// import { createContext, ReactNode, useContext, useState } from "react";

// interface CompletedVideosContextType {
//   completedVideos: Set<string>;
//   addCompletedVideo: (videoTitle: string) => void;
// }

// const CompletedVideosContext = createContext<
//   CompletedVideosContextType | undefined
// >(undefined);

// export const CompletedVideosProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [completedVideos, setCompletedVideos] = useState<Set<string>>(() => {
//     const savedVideos = JSON.parse(
//       localStorage.getItem("completedVideos") || "[]"
//     );
//     return new Set(savedVideos);
//   });

//   const addCompletedVideo = (videoTitle: string) => {
//     setCompletedVideos((prev) => {
//       const newCompletedVideos = new Set(prev);
//       newCompletedVideos.add(videoTitle);
//       localStorage.setItem(
//         "completedVideos",
//         JSON.stringify(Array.from(newCompletedVideos))
//       );
//       return newCompletedVideos;
//     });
//   };

//   return (
//     <CompletedVideosContext.Provider
//       value={{ completedVideos, addCompletedVideo }}
//     >
//       {children}
//     </CompletedVideosContext.Provider>
//   );
// };

// export const useCompletedVideos = (): CompletedVideosContextType => {
//   const context = useContext(CompletedVideosContext);
//   if (!context) {
//     throw new Error(
//       "useCompletedVideos must be used within a CompletedVideosProvider"
//     );
//   }
//   return context;
// };
