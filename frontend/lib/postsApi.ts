import type { Post, ApiResponse } from "./types";
import { fetchWithCookies } from "./api-utils";

// Server-side version for use in Server Components
export async function getAllPostsServer(): Promise<Post[]> {
  try {
    const response = await fetchWithCookies("/post/all", {
      method: "GET",
    });

    const result: ApiResponse<Post[]> = await response.json();

    if (result.data) {
      return result.data;
    }

    throw new Error(result.message || "Failed to fetch posts");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching posts");
  }
}

export async function getPostServer(postId: number): Promise<Post> {
  try {
    const response = await fetchWithCookies(`/post/${postId}`, {
      method: "GET",
    });

    const result: ApiResponse<Post> = await response.json();

    if (result.data) {
      return result.data;
    }

    throw new Error(result.message || "Failed to fetch post");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching post");
  }
}

// Client-side version (keeping for future use if needed)
import { fetchWithCredentials } from "./api-utils";

export const postsApi = {
  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    const response = await fetchWithCredentials("/post/all", {
      method: "GET",
    });
    return response.json();
  },

  async getPost(postId: number): Promise<ApiResponse<Post>> {
    const response = await fetchWithCredentials(`/post/${postId}`, {
      method: "GET",
    });
    return response.json();
  },

  async createPost(data: {
    title: string;
    content: string;
  }): Promise<ApiResponse<Post>> {
    const response = await fetchWithCredentials("/post/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
