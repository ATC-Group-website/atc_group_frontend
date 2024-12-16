export interface Admin {
  message: string;
  token: string;
  expiration_time: number;
  user: {
    id: number;
    name: string;
  };
}

export interface Login {
  name: string;
  password: string;
}

export interface NewPost {
  title: string;
  description: string;
  type: string | null;
  images: Image[];
  youtube_url?: string;
}

export interface PostCreationResponse {
  message: string;
  post: Post;
}
export interface Image {
  title: string;
  path: string;
}
export interface Post {
  id: number;
  title: string;
  description: string;
  type: string;
  slug: string;
  images?: Image[];
  video_url?: string;
}
export interface PaginatedPosts {
  current_page: number;
  data: string[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string[];
  next_page_url: string;
  path: string;
  per_page: number;
  preve_page_url: string | null;
  to: number;
  total: number;
}
