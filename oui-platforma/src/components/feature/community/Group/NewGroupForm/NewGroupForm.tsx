import { newGroup } from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IGroup } from "@/typings/course";
import { Button, Card, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";

export const NewGroupForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Group name is required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newGroupData: Partial<IGroup> = {
      name,
      description,
      members_count: 0,
      logo_url: logoUrl,
      level: 1,
    };

    try {
      await newGroup(newGroupData);
      toast({
        title: "Success",
        description: "Group created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate(swrKeys.groups);
      setName("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card variant={"light"} w={"full"}>
      <Input
        variant={"dark"}
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={4}
      />
      <Textarea
        placeholder="Group Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Logo URL"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSubmit} variant={"light"}>
        Create Group
      </Button>
    </Card>
  );
};
