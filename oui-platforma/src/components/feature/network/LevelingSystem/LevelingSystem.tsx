import { IUser } from "@/typings/course";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface LevelingSystemProps {
  user: IUser;
}

export const calculateLevel = (experiencePoints: number): number => {
  const levelThresholds = [
    100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500,
  ];
  for (let i = 0; i < levelThresholds.length; i++) {
    if (experiencePoints < levelThresholds[i]) {
      return i + 1;
    }
  }
  return levelThresholds.length + 1;
};

export const LevelingSystem = ({ user }: LevelingSystemProps) => {
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    setLevel(calculateLevel(user.experiencePoints || 0));
  }, [user.experiencePoints]);

  return <Box>lvl {level}</Box>;
};
