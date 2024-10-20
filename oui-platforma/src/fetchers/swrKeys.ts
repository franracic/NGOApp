const apiUrl = "http://localhost:8000/api";

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
  lectures: `${apiUrl}/courses/courses/lectures/`,
  workshops: `${apiUrl}/courses/courses/workshops/`,
};
