import { ICourseContent } from "@/typings/course";
import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import React from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { FormComponent } from "./components/FormComponent";
import { ImageComponent } from "./components/ImageComponent";
import { MarkdownTextComponent } from "./components/MarkdownTextComponent";
import { PdfViewer } from "./components/PdfViewer";
import { PollComponent } from "./components/PollComponent";
import { QuizComponent } from "./components/QuizComponent";
import { SurveyComponent } from "./components/SurveyComponent";
import { UploadComponent } from "./components/UploadComponent";
import { VideoPlayer } from "./components/VideoPlayer";

const componentMap: Record<ICourseContent["type"], React.FC<any>> = {
  pdf: PdfViewer,
  video: VideoPlayer,
  audio: AudioPlayer,
  image: ImageComponent,
  text: MarkdownTextComponent,
  quiz: QuizComponent,
  form: FormComponent,
  poll: PollComponent,
  survey: SurveyComponent,
  upload: UploadComponent,
};

interface ContentRendererProps {
  content: ICourseContent;
  onContentComplete: (title: string) => void;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentComplete,
}) => {
  const Component = componentMap[content.type];
  if (!Component) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          Unable to load content of type &quot;{content.type}&quot;. Please try
          again later.
        </Alert>
        <Button
          mt={4}
          colorScheme="red"
          onClick={() => onContentComplete(content.title)}
        >
          Mark as Complete
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Component
        {...content}
        onComplete={() => onContentComplete(content.title)}
      />
    </Box>
  );
};
