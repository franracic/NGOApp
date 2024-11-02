export interface ICourse {
  title: string;
  cover_image?: string;
  average_rating?: number;
  description?: string;
  id: number;
  no_of_ratings?: number;
  authors?: IAuthor[];
  total_duration?: string;
  is_unlocked?: boolean;
  is_completed?: boolean;
  sections: ICourseSection[];
  course?: string;
  type: "Lecture" | "Workshop" | "Exam";
  completed?: number;
  contentCount?: number;
  progress?: number;
  resources?: number[];
  comments?: number[];
}

export interface Video {
  title: string;
  url: string;
  duration: string;
  transcript?: string;
}

export interface IAuthor {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  youtube?: string;
  linkedin?: string;
  externalLink?: string;
}

export interface INewResource {
  title: string;
  description: string;
  link: string;
  type: string;
  language: string;
  category: string;
  tags?: string[];
  views: number;
  likes: number[];
  isOfficial: boolean;
}
export interface IResource extends INewResource {
  id: number;
  createdBy: IUser;
  createdAt: Date;
}

export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  interests?: string[];
  city?: string;
  jobTitle?: string;
  bio?: string;
  country?: string;
  isNetworking?: boolean;
  website?: string;
  NGO?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  availabilityStatus?: string;
  activityLevel?: number;
  experiencePoints?: number;
  level: number;
  connectionsCount?: number;
  isMentor?: boolean;
  expertise?: string[];
  mentees?: IUser[];
  mentor?: IUser;
  completed_courses_count?: number;
  submitted_resources_count?: number;
  connections_count?: number;
  login_streak?: number;
  comment_count?: number;
  perfect_quizzes_count?: number;
  liked_resources_count?: number;
  viewed_resources_count?: number;
  time_spent_learning?: number;
  role: "beginner" | "worker" | "mentor" | "admin" | "practitioner";
  events?: IEvent[];
  courses?: number[];
  groups?: IGroup[];
}

export interface INotification {
  id: number;
  recipient: number;
  sender: number | null;
  sender_username: string | null;
  notification_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  related_object_id: number | null;
  related_menu_item: string | null;
}

export interface IConnection {
  id: number;
  sender: IUser;
  receiver: IUser;
  isAccepted: boolean;
}

export interface ITrophy {
  id: number;
  title: string;
  description: string;
  icon: string;
  trophy_type: string;
  target_value: number;
  difficulty: string;
  progress: number;
  is_earned: boolean;
}

export interface IUserInput {
  id: number;
  user: number;
  title?: string;
  content: string;
  bg_color?: string;
}

export interface IMessage {
  id: number;
  sender: IUser;
  recipient: IUser;
  content: string;
}

export interface IGroupMessage {
  id: number;
  sender: IUser;
  group: IGroup;
  content: string;
}

export interface IActivity {
  id: number;
  userId: string;
  username: string;
  action: string;
  target?: string;
  timestamp: Date;
}

export interface IDiscussion {
  id: number;
  title: string;
  author: IUser;
  comments: number[];
  timestamp: Date;
  description: string;
}

export interface IGroup {
  id: number;
  name: string;
  description: string;
  level: number;
  members_count: number;
  is_member: boolean;
  members: IUser[];
  logo_url: string;
}

export interface IEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  attendees: IUser[];
  attendees_count: number;
  level: number;
  tags?: string[];
}

export interface IComment {
  id: number;
  content: string;
  user: IUser;
  timestamp: string;
  replies: IComment[];
  likes_count: number;
  is_liked: boolean;
}

export interface ICourseSection {
  title: string;
  contents: ICourseContent[];
}

export interface IQuizQuestion {
  type: "multiple-choice" | "true-false";
  question: string;
  options: string[];
  correct_answer: string;
}

export type ICourseContent =
  | IPdfContent
  | IVideoContent
  | IAudioContent
  | IImageContent
  | ITextContent
  | IQuizContent
  | IFormContent
  | IPollContent
  | ISurveyContent
  | IUploadContent;

export interface PollOption {
  label: string;
  votes: number;
}

export interface PollQuestion {
  question: string;
  options: PollOption[];
}

export interface IFormField {
  label: string;
  type: string;
  options?: string[];
  accept?: string;
}

export interface IPdfContent extends ICourseContentBase {
  type: "pdf";
  url: string;
  duration?: string;
}

export interface ICourseContentBase {
  id: number;
  type:
    | "pdf"
    | "video"
    | "quiz"
    | "form"
    | "upload"
    | "survey"
    | "poll"
    | "image"
    | "text"
    | "audio";
  title: string;
  description?: string;
  is_completed?: boolean;
}

export interface IVideoContent extends ICourseContentBase {
  type: "video";
  url: string;
  duration?: string;
}
export interface IAudioContent extends ICourseContentBase {
  type: "audio";
  url: string;
  duration?: string;
  transcript?: string;
}

export interface IImageContent extends ICourseContentBase {
  type: "image";
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface ITextContent extends ICourseContentBase {
  type: "text";
  content: string;
  completeAfterSeconds?: number;
}

export interface IQuizContent extends ICourseContentBase {
  type: "quiz";
  quizData: IQuizQuestion[];
}

export interface IFormContent extends ICourseContentBase {
  type: "form";
  formFields: IFormField[];
}

export interface IPollContent extends ICourseContentBase {
  type: "poll";
  pollData: PollQuestion;
}
export interface SurveyQuestion {
  id: number;
  question: string;
  type: "multiple-choice" | "text" | "rating";
  options?: string[];
  ratingScale?: number;
  placeholder?: string;
}

export interface ISurveyContent extends ICourseContentBase {
  type: "survey";
  survey_questions: SurveyQuestion[];
}

export interface IUploadContent extends ICourseContentBase {
  type: "upload";
  acceptedFileTypes?: string[];
  multiple?: boolean;
}

export interface IMentorshipRequest {
  id: number;
  sender: IUser;
  mentor: IUser;
  status: string;
  sent_at: string;
}
