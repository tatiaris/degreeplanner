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
}
export interface CollapsibleBtnsProps {
  courseType: string;
  courseList: Array<Course>;
  activateModal: () => void;
  opposite: boolean;
  reqAmount: number;
}
export interface CourseColumnProps {
  courseList: Array<Course>;
  handleCourseClick: () => void;
  opposite: boolean;
  categories: Record<string, unknown>;
}
export interface CompletionColumnProps {
  courseList: Array<Course>;
  handleCourseClick: () => void;
  opposite: boolean;
  categories: Record<string, unknown>;
}
export interface PlaceHolderProps {
  show: boolean;
}
