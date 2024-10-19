"use client";
import { MyProfile } from "@/components/feature/user/MyProfile/MyProfile";
import { IUser } from "@/typings/course";

const mockUser: IUser = {
  name: "Fran Račić",
  username: "Fran Račić",
  jobTitle: "Software Engineer",
  city: "Zagreb",
  country: "Croatia",
  email: "fran.racic@gmail.com",
  avatar: "https://bit.ly/fran-profile",
  id: 1,
  isNetworking: true,
  website: "https://franr.dev",
  linkedin: "https://linkedin.com/in/franracic",
  twitter: "https://twitter.com/franracic",
  instagram: "https://instagram.com/franracic",
  bio: "Software Engineer with a passion for building products that help people.",
  interests: ["Climbing", "Cooking", "Traveling"],
  level: 10,
};

export default function Profile() {
  // const { setHasNotification } = useContext(ReviewContext);

  // useEffect(() => {
  //   setHasNotification(false);
  // }, [setHasNotification]);

  return <MyProfile userId="1" />;
}
