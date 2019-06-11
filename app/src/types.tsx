export interface EmployeeType {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  owner: boolean;
}

export interface FeedbackType {
  id: number;
  reviewer: string;
  reviewee: string;
  assignedDate: string;
  dueDate: string;
}

