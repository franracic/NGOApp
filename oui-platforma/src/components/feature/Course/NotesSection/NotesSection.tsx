"use client";
import { Box, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface NotesSectionProps {
  videoTitle: string;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ videoTitle }) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${videoTitle}`);
    if (savedNote) {
      setNote(savedNote);
    } else {
      const mockNote = `STEAM is an educational approach that integrates Science, Technology, Engineering, Arts, and Mathematics. It emphasizes the importance of creativity in solving complex problems and prepares students for careers in a rapidly changing world. By engaging in STEAM activities, learners develop critical thinking, collaboration, and innovation skills, which are essential in today's global economy.`;
      setNote(mockNote);
      localStorage.setItem(`note-${videoTitle}`, mockNote);
    }
  }, [videoTitle]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem(`note-${videoTitle}`, e.target.value);
  };

  return (
    <Box mt={1}>
      <Textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Take your notes here..."
        size="md"
        resize="vertical"
        h={"250px"}
      />
    </Box>
  );
};
