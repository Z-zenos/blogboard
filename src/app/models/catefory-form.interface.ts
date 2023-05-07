import { ICategory } from "./category.interface";

export interface ICategoryForm {
  isDisplay: boolean;
  category?: ICategory;
  type?: string
}