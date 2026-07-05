"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/core/Fetch";

export interface CreateReplyUser {
  _id: string;
  name: string;
  profileImage: string | null;
}

export interface CreateReplyData {
  _id: string;
  comment: string;
  content: string;
  createdAt: string;
  user: CreateReplyUser;
}

export interface CreateReplyResponse {
  success: boolean;
  message: string;
  data: CreateReplyData;
}

export interface CreateReplyPayload {
  commentId: string;
  courseId: string;
  content: string;
}

export async function createCommentReply({
  commentId,
  courseId,
  content,
}: CreateReplyPayload) {
  const response = await apiFetch<CreateReplyResponse>(
    `/replies/${commentId}`,
    {
      method: "POST",
      body: { content },
    },
  );

  if (response && typeof response === "object" && "errorMessage" in response) {
    return { success: false, message: response.errorMessage };
  }

  const apiRes = response as CreateReplyResponse;

  if (apiRes?.success) {
    revalidatePath(`/coursedetail/${courseId}`);
    return { success: true, message: apiRes.message, data: apiRes.data };
  }

  return {
    success: false,
    message: "Failed to submit reply. Please try again",
  };
}
