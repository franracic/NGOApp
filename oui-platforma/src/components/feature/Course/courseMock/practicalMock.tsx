import { ICourseSection } from "@/typings/course";

export const mockPracticalCourse: ICourseSection[] = [
  {
    title: "Section 1: Practical Introduction",
    contents: [
      {
        type: "video",
        title: "Practical Task Overview",
        url: "https://youtu.be/_-F1YT-yxOs",
        duration: "4:01",
        transcript: "This video provides an overview of the practical tasks...",
      },
      {
        type: "image",
        title: "Task Diagram",
        url: "https://www.europeanschoolnetacademy.eu/asset-v1:Novigado+ActiveLearning+2022+type@asset+block@29428436431_c12484fd8c_b.jpg",
      },
      {
        type: "text",
        title: "Task Explanation",
        placeholder: "Please write your explanation for the task here...",
      },
    ],
  },
  {
    title: "Section 2: Practical Task 1",
    contents: [
      {
        type: "image",
        title: "Practical Task 1 - Image Reference",
        url: "https://www.europeanschoolnetacademy.eu/assets/courseware/v1/a4f725364e36ca5598c3f0bd365d986f/asset-v1:Scientix+STEMOutOfTheBox+2024+type@asset+block/kids-in-stem.png",
      },
      {
        type: "video",
        title: "Task 1 - Step-by-Step Guide",
        url: "https://youtu.be/A-Xq-z_tBtE",
        duration: "10:23",
        transcript: "This video guides you through Task 1 step-by-step...",
      },
      {
        type: "pdf",
        title: "Task 1 Instructions",
        url: "https://www.europeanschoolnetacademy.eu/assets/courseware/v1/632bb5ef3e860a3979ad99ed869127f2/asset-v1:Scientix+STEMOutOfTheBox+2024+type@asset+block/Scientix-MOOC-M2-LS-SEC.pdf",
      },
      {
        type: "text",
        title: "Task 1 - Your Explanation",
        placeholder: "Please describe your approach and findings...",
      },
    ],
  },
  {
    title: "Section 3: Practical Task 2",
    contents: [
      {
        type: "video",
        title: "Task 2 Overview",
        url: "https://youtu.be/sample-task2-video",
        duration: "7:45",
        transcript: "An overview of Task 2...",
      },
      {
        type: "image",
        title: "Task 2 Reference Image",
        url: "https://example.com/task2-image.jpg",
      },
      {
        type: "pdf",
        title: "Task 2 Documentation",
        url: "https://example.com/task2-documentation.pdf",
      },
      {
        type: "text",
        title: "Task 2 - Your Explanation",
        placeholder: "Provide a detailed explanation of your process...",
      },
    ],
  },
  {
    title: "Section 4: Final Practical Task",
    contents: [
      {
        type: "image",
        title: "Final Task Reference Image",
        url: "https://example.com/final-task-image.jpg",
      },
      {
        type: "video",
        title: "Final Task Walkthrough",
        url: "https://youtu.be/final-task-video-url",
        duration: "12:00",
        transcript: "This video walks you through the final practical task...",
      },
      {
        type: "upload",
        title: "Upload Your Final Task",
        formFields: [
          {
            label: "Upload your completed task (PDF/Word document or video).",
            type: "file",
            accept: ".pdf,.doc,.docx,.mp4,.mov",
          },
        ],
      },
      {
        type: "text",
        title: "Final Task Reflection",
        placeholder: "Reflect on your experience and the outcomes...",
      },
    ],
  },
];
