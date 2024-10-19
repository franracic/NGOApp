import { IUser } from "@/typings/course";
import { faker } from "@faker-js/faker";

export const generateMockUsers = (
  numUsers: number,
  depth: number = 1
): IUser[] => {
  const users: IUser[] = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      name: faker.name.fullName(),
      username: faker.name.firstName() + " " + faker.name.lastName(),
      interests: faker.random.words(3).split(" "),
      city: faker.address.city(),
      id: faker.datatype.number(),
      jobTitle: faker.name.jobTitle(),
      bio: faker.lorem.sentence(),
      country: faker.address.country(),
      isNetworking: faker.datatype.boolean(),
      website: faker.internet.url(),
      linkedin: faker.internet.url(),
      twitter: faker.internet.url(),
      instagram: faker.internet.url(),
      availabilityStatus: faker.helpers.arrayElement([
        "Available",
        "Busy",
        "Away",
      ]),
      activityLevel: faker.datatype.number({ min: 1, max: 100 }),
      experiencePoints: faker.datatype.number({ min: 100, max: 10000 }),
      level: faker.datatype.number({ min: 1, max: 10 }),
      connectionsCount: faker.datatype.number({ min: 0, max: 100 }),
      isMentor: i % 3 === 0,
      expertise: ["React", "Node.js", "CSS", "TypeScript"].slice(
        0,
        Math.floor(Math.random() * 4) + 1
      ),
      mentees: i % 3 === 0 && depth > 0 ? generateMockUsers(3, depth - 1) : [],
    });
  }
  return users;
};
