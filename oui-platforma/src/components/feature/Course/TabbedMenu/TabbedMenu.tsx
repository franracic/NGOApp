import { ICourse } from "@/typings/course";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { DiscussionBoard } from "../DiscussionBoard/DiscussionBoard";
import { NotesSection } from "../NotesSection/NotesSection";
import { OverviewSection } from "../OverviewSection.tsx/OverviewSection";
import { ResourcesSection } from "../ResourcesSection/ResourcesSection";

interface TabbedMenuProps {
  course: ICourse;
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const TabbedMenu: React.FC<TabbedMenuProps> = ({
  course,
  activeTab,
  onTabChange,
}) => {
  return (
    <Box mt={8} overflow={"auto"} p={4}>
      <Tabs
        variant="soft-rounded"
        colorScheme="yellow"
        index={activeTab}
        onChange={onTabChange}
      >
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Resources</Tab>
          <Tab>Notes</Tab>
          <Tab>Discussion</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OverviewSection course={course} />
          </TabPanel>
          <TabPanel>
            <ResourcesSection resourceIds={course.resources || []} />
          </TabPanel>
          <TabPanel>
            <NotesSection videoTitle={course.title} />
          </TabPanel>
          <TabPanel>
            <DiscussionBoard
              courseId={course.id}
              commentIds={course.comments || []}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
