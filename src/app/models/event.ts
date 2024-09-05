export interface Event {
    id: string;
    name: string;
    description?: string;
    type: string;
    color?: string;
    startDate: string;
    endDate?: string;
    everyYear?: boolean;
  }  