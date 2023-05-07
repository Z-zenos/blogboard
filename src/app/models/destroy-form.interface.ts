export interface IDestroyForm {
  isDisplay: boolean;
  title?: string;
  destroyData?: {
    value: string;
    id: string;
  };
  service?: string;
}