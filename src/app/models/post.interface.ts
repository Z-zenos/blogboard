export interface IPost {
  title: string;
  permalink: string;
  content: string;
  references: string[];
  categories: { id: string, name: string }[];
  image: string;
  excerpt: string;

  speakable: boolean;

  comment_id: string;

  view: number;
  awards: string[];
  like: number;
  isFeatured: boolean;
  status: string;


  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}
