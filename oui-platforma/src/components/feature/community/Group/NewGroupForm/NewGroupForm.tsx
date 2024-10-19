import { IGroup } from "@/typings/course";
import { Button, Card, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const NewGroupForm = ({
  addGroup,
}: {
  addGroup: (group: IGroup) => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newGroup: IGroup = {
      id: Math.random(),
      name,
      description,
      members: 1,
      memberList: [],
      level: 1,
    };
    addGroup(newGroup);
    setName("");
    setDescription("");
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
      <Button onClick={handleSubmit} variant={"light"}>
        Create Group
      </Button>
    </Card>
  );
};
