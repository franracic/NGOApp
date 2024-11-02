import { IUser } from "@/typings/course";
import { Box, Grid, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MentorCard } from "../MentorCard/MentorCard";

export const MentorSearch = ({ mentors }: { mentors: IUser[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise?.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Find a Mentor
      </Text>
      <Input
        placeholder="Search mentors by name or expertise"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onMessageClick={() => console.log("a")}
            />
          ))
        ) : (
          <Text>No mentors found matching your criteria.</Text>
        )}
      </Grid>
    </Box>
  );
};
