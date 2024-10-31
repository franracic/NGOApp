import { GroupInfo } from "@/components/feature/community/Group/GroupInfo/GroupInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Information",
  description: "Details and information about the selected group.",
};

export default function GroupID() {
  return <GroupInfo />;
}
