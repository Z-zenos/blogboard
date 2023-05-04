export interface Post {
  title: string;
  permanlink: string;
  content: string;
  categories: string[];
  image: string;
  authors_id: string[];
  excerpt: string;

  speakable: boolean;

  comment_id: string;

  view: number;
  awards: string[];
  like: number;

  references: string[];

  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}
