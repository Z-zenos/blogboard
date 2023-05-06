export interface Post {
  title: string;
  permalink: string;
  content: string;
  categories: { id: string, name: string }[];
  image_url: string;
  authors_id: string[];
  excerpt: string;

  speakable: boolean;

  comment_id: string;

  view: number;
  awards: string[];
  like: number;
  isFeatured: boolean;
  status: string;

  references: string[];

  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}
