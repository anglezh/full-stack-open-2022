interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface WithDescriptionCoursePart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends WithDescriptionCoursePart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends WithDescriptionCoursePart {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSpecialpart extends WithDescriptionCoursePart{
  type: "special";
  requirements:string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialpart;
