export interface PostDto {
  postId: number;
  title: string;
  content: string;
  featured: boolean;
  imageBase64?: string;
  createdAt: string;
  category: string;
  username: string;
}
