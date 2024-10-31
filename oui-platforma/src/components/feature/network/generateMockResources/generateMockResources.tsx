// import { faker } from "@faker-js/faker";
// import { generateMockUsers } from "../GenerateMockUsers/GenerateMockUsers";

// export const generateMockResources = (numResources: number) => {
//   const resources = [];
//   for (let i = 0; i < numResources; i++) {
//     resources.push({
//       id: i,
//       title: faker.random.words(3),
//       description: faker.lorem.sentence(),
//       link: faker.internet.url(),
//       level: faker.datatype.number({ min: 1, max: 10 }),
//       type: faker.helpers.arrayElement(["Video", "Article", "PDF", "Other"]),
//       createdBy: generateMockUsers(1)[0],
//       createdAt: faker.date.recent(),
//       tags: faker.random.words(3).split(" "),
//     });
//   }
//   return resources;
// };
