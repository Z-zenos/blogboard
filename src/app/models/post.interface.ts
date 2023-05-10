export interface IPost {
  id?: string;
  title: string;
  permalink: string;
  content: string;
  references: string[];
  categories: { id: string, name: string }[];
  image: string;
  excerpt: string;

  speakable?: boolean;

  comment_id: string;

  view: number;
  awards?: string[];
  like: number;
  isFeatured: boolean;
  status?: string;


  created_at?: number;
  updated_at?: number;
  deleted?: boolean;
}
