"use client";

import {
  Box,
  Button,
  Progress,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface UploadComponentProps {
  onUpload: (
    file: File,
    onProgress: (percent: number) => void
  ) => Promise<void>;
  onComplete?: () => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  uploadButtonText?: string;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
  onUpload,
  onComplete,
  acceptedFileTypes = [],
  multiple = false,
  uploadButtonText = "Upload",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      const progress: { [key: string]: number } = {};
      Array.from(e.target.files).forEach((file) => {
        progress[file.name] = 0;
      });
      setUploadProgress(progress);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      for (let file of selectedFiles) {
        await onUpload(file, (percent) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
        });
        toast({
          title: "Upload Successful",
          description: `${file.name} has been uploaded.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      setSelectedFiles([]);
      setUploadProgress({});
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onComplete && onComplete();
      setIsUploading(false);
    }
  };

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      bg="gray.50"
    >
      <VStack spacing={4} align="stretch">
        <input
          type="file"
          multiple={multiple}
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileChange}
        />
        {selectedFiles.length > 0 && (
          <VStack align="stretch" spacing={2}>
            {selectedFiles.map((file) => (
              <Box key={file.name}>
                <Text>{file.name}</Text>
                <Progress
                  value={uploadProgress[file.name] || 0}
                  size="sm"
                  colorScheme="green"
                />
              </Box>
            ))}
          </VStack>
        )}
        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isDisabled={selectedFiles.length === 0 || isUploading}
          isLoading={isUploading}
        >
          {uploadButtonText}
        </Button>
      </VStack>
    </Box>
  );
};
