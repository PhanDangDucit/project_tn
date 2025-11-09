export type TPost = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  reading_time: number;
  view_count: number;
  description?: string;
};