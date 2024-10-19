import { ICourseContent } from "@/typings/course";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { FormComponent } from "./components/FormComponent";
import { PdfViewer } from "./components/PdfViewer";
import { PollComponent } from "./components/PollComponent";
import { QuizComponent } from "./components/QuizComponent";
import { SurveyComponent } from "./components/SurveyComponent";
import { UploadComponent } from "./components/UploadComponent";
import { VideoPlayer } from "./components/VideoPlayer";

interface ContentRendererProps {
  content: ICourseContent;
  onContentComplete: (contentTitle: string) => void;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentComplete,
}) => {
  switch (content.type) {
    case "video":
      return (
        <VideoPlayer
          url={content.url!}
          onEnded={() => onContentComplete(content.title)}
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
    case "quiz":
      return (
        <QuizComponent
          quizData={content.quizData!}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "form":
      return (
        <FormComponent
          formFields={content.formFields!}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "upload":
      return (
        <UploadComponent onComplete={() => onContentComplete(content.title)} />
      );
    case "survey":
      return (
        <SurveyComponent
          questions={[]}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "poll":
      return (
        <PollComponent
          pollData={content.pollData!}
          onComplete={() => onContentComplete(content.title)}
        />
      );
    case "youtube":
      return (
        <VideoPlayer
          url={content.url!}
          onEnded={() => onContentComplete(content.title)}
        />
      );
    default:
      return <Heading as="h2">Content not supported</Heading>;
  }
};
