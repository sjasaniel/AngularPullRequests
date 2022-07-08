interface PullRequest{
  number: number;
  title: string;
  state: string;
  requestedReviewer?: string;
  createdAt?: string;
  [key: string]: any;
}

interface ColumnDetail {
  columnId: string;
  columnName: string;
}

interface PRDetail {
  number: string;
  title: string;
  state: string;
  createdAt: string;
  requestedReviewer: string;
}