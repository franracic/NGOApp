export interface ICourse {
  title: string;
  cover_image?: string;
  average_rating?: number;
  description?: string;
  id: string;
  no_of_reviews?: number;
  authors?: IAuthor[];
  total_duration?: string;
  isUnlocked?: boolean;
  sections: ICourseSection[];
  course?: string;
  type: "Lecture" | "Workshop" | "Exam";
  completed?: number;
  contentCount?: number;
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
  name: string;
  email: string;
  avatar: string;
  username: string;
  interests?: string[];
  city: string;
  id: number;
  jobTitle: string;
  bio?: string;
  country: string;
  isNetworking?: boolean;
  website?: string;
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
  role: string;
  activity?: IActivity[];
  events?: IEvent[];
  groups?: IGroup[];
  trophies?: ITrophy[];
  likedResources?: number[];
  completedCourses?: number[];
}

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  status: string;
  level: number;
  progress: number;
}
export interface ITrophy {
  id: number;
  title: string;
  description: string;
  icon: any;
  progress: number;
  isEarned: boolean;
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
  author: string;
  content: string;
  timestamp: Date;
}

export interface IGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  memberList: IUser[];
  level: number;
}

export interface IEvent {
  id: number;
  name: string;
  date: Date;
  description: string;
  attendees: number;
  level: number;
}

export interface IQuizQuestion {
  type: "multiple-choice" | "true-false";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ICourseSection {
  title: string;
  contents: ICourseContent[];
}

export interface ICourseContent {
  type:
    | "pdf"
    | "video"
    | "quiz"
    | "form"
    | "upload"
    | "survey"
    | "youtube"
    | "poll"
    | "image"
    | "text"
    | "audio";
  title: string;
  url?: string;
  duration?: string;
  transcript?: string;
  quizData?: IQuizQuestion[];
  formFields?: IFormField[];
  pollData?: PollQuestion;
  placeholder?: string;
  description?: string;
}

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
