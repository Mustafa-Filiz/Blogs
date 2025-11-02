import type { Comment, ApiResponse } from "./types";
import { fetchWithCredentials } from "./api-utils";

export const commentsApi = {
  async getCommentsByPost(postId: number): Promise<ApiResponse<Comment[]>> {
    const response = await fetchWithCredentials(`/comment/post/${postId}`, {
      method: "GET",
    });
    return response.json();
  },

  async createComment(
    postId: number,
    content: string
  ): Promise<ApiResponse<Comment>> {
    const response = await fetchWithCredentials("/comment/create", {
      method: "POST",
      body: JSON.stringify({ postId, content }),
    });
    return response.json();
  },
};

