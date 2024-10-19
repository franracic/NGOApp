import { ICourseContent } from "@/typings/course";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { PdfViewer } from "../../Course/ContentRenderer/components/PdfViewer";
import { VideoPlayer } from "../../Course/ContentRenderer/components/VideoPlayer";
import { ImageViewer } from "./components/ImageViewer";
import { TextAreaComponent } from "./components/TextAreaComponent";

interface PracticalContentRendererProps {
  content: ICourseContent;
  onContentComplete: (contentTitle: string) => void;
}

export const PracticalContentRenderer: React.FC<
  PracticalContentRendererProps
> = ({ content, onContentComplete }) => {
  switch (content.type) {
    case "video":
      return (
        <VideoPlayer
          url={content.url!}
          onEnded={() => onContentComplete(content.title)}
        />
      );
    case "image":
      return (
        <ImageViewer
          url={content.url!}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "pdf":
      return (
        <PdfViewer
          title={content.title}
          url={content.url!}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "text":
      return (
        <TextAreaComponent
          placeholder="Please write your explanation here..."
          onComplete={() => onContentComplete(content.title)}
        />
      );
    default:
      return <Heading as="h2">Content not supported</Heading>;
  }
};
