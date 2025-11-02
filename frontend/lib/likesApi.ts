import type { ApiResponse } from "./types";
import { fetchWithCredentials } from "./api-utils";

export const likesApi = {
  async likePost(postId: number): Promise<ApiResponse<null>> {
    const response = await fetchWithCredentials(`/like/post/${postId}`, {
      method: "POST",
    });
    return response.json();
  },

  async unlikePost(postId: number): Promise<ApiResponse<null>> {
    const response = await fetchWithCredentials(`/like/post/${postId}`, {
      method: "DELETE",
    });
    return response.json();
  },

  async likeComment(commentId: number): Promise<ApiResponse<null>> {
    const response = await fetchWithCredentials(`/like/comment/${commentId}`, {
      method: "POST",
    });
    return response.json();
  },

  async unlikeComment(commentId: number): Promise<ApiResponse<null>> {
    const response = await fetchWithCredentials(`/like/comment/${commentId}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

