const apiUrl = "https://api.platform.zenzonemedia.com/api";

export const swrKeys = {
  register: `${apiUrl}/users/register/`,
  validateEmail: `${apiUrl}/users/validate-email/`,
  login: `${apiUrl}/users/login/`,
  currentUser: `${apiUrl}/users/me`,
  updateUser(id: number) {
    return `${apiUrl}/users/users/${id}/`;
  },
  userInfo(id: number) {
    return `${apiUrl}/users/users/${id}/`;
  },
  courses: `${apiUrl}/courses/courses/`,
  editCourse(id: number) {
    return `${apiUrl}/courses/courses/${id}/`;
  },
  resources: `${apiUrl}/networking/resources/`,
  resource: (id: number) => `${apiUrl}/networking/resources/${id}/`,
  multipleResources: `${apiUrl}/networking/resources/get_multiple/`,
  lectures: `${apiUrl}/courses/lectures/`,
  workshops: `${apiUrl}/courses/workshops/`,
  exams: `${apiUrl}/courses/exams/`,
  completeCourse(id: number) {
    return `${apiUrl}/courses/courses/${id}/complete/`;
  },
  completeContent: (id: number) =>
    `${apiUrl}/courses/course-contents/${id}/complete/`,
  comments: `${apiUrl}/courses/comments/`,
  multipleComments: `${apiUrl}/courses/comments/get_multiple/`,
  comment: (id: number) => `${apiUrl}/courses/comments/${id}/`,
  trophies: `${apiUrl}/networking/trophies/`,
  userInputs: `${apiUrl}/networking/user-inputs/`,
  trophyTemplates: `${apiUrl}/networking/trophy-templates/with_user_progress/`,
  users: `${apiUrl}/users/users/`,
  connections: `${apiUrl}/users/connections/`,
  connectionRequests: `${apiUrl}/users/connection-requests/`,
  messages: `${apiUrl}/users/messages/`,
  notifications: `${apiUrl}/networking/notifications/`,
  availableMentors: `${apiUrl}/users/users/available_mentors/`,
  mentorshipRequests: `${apiUrl}/users/mentorship-requests/`,
  mentees: `${apiUrl}/users/users/mentees/`,
  MenteeDashboard: (id: number) => `${apiUrl}/users/users/${id}/dashboard/`,
  mentor: `${apiUrl}/users/users/mentor/`,
  discussions: `${apiUrl}/networking/discussions/`,
  groups: `${apiUrl}/networking/groups/`,
  groupMessages: `${apiUrl}/networking/group-messages/`,
  events: `${apiUrl}/networking/events/`,
  eventDetails: (id: number) => `${apiUrl}/networking/events/${id}/`,
};
