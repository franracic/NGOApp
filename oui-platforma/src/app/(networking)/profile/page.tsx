import { MyProfile } from "@/components/feature/user/MyProfile/MyProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - User Information",
  description: "View and edit your personal profile information.",
};

export default function Profile() {
  return <MyProfile />;
}
