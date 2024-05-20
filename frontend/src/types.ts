export interface tableInterface {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface fieldInterface {
  name: string;
  title: string;
  type:
    | "numeric"
    | "timestamp"
    | "date"
    | "time"
    | "boolean"
    | "varchar"
    | "text";
  isPrimary: boolean;
}
