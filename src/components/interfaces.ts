export interface MheaderProps {
  title: string;
}

export interface MnavbarProps {
  theme: "light" | "dark";
}

export interface CollapsibleBtnsProps {
    courseType: string;
    courseList: any;
    activateModal: any;
    opposite: boolean;
    reqAmount: number;
}
export interface MoveCourseModalProps {
    moveOptions: any;
    showModal: boolean;
}
export interface CourseColumnProps {
    courseList: any;
    handleCourseClick: any;
    opposite: boolean;
}
export interface CompletionColumnProps {
    courseList: any;
    handleCourseClick: any;
    opposite: boolean;
}
