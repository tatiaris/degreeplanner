export interface MheaderProps {
  title: string;
}

export interface MnavbarProps {
  theme: 'light' | 'dark';
}
export interface Course {
  id: string;
  name: string;
  title: string;
  department: string;
  course_num: number;
  credit_hours: number;
  description: string;
  prereqDescription: string;
  coreqDescription: string;
  location?: string;
  type?: string;
}
export interface Category {
  courses: string;
  hours: number;
}
export interface CollapsibleBtnsProps {
  courseType: string;
  courseList: Array<Course>;
  activateModal: (course: string) => void;
  opposite: boolean;
  reqAmount: number;
}
export interface CourseColumnProps {
  courseList: Array<Course>;
  handleCourseClick: (course: string) => void;
  opposite: boolean;
  categories: Record<string, Category>;
}
export interface CompletionColumnProps {
  courseList: Array<Course>;
  handleCourseClick: (course: string) => void;
  opposite: boolean;
  categories: Record<string, Category>;
}
export interface PlaceHolderProps {
  show: boolean;
}
