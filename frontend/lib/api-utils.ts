const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

// Client-side fetch utility
export async function fetchWithCredentials(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let error: any = { message: "An error occurred" };

    if (contentType && contentType.includes("application/json")) {
      error = await response.json().catch(() => ({
        message: `Request failed with status ${response.status}`,
      }));
    } else {
      const text = await response.text().catch(() => "");
      error.message = text || `Request failed with status ${response.status}`;
    }

    // Handle backend error response format: { status: 'fail', message: '...' }
    const errorMessage =
      error.message ||
      error.status ||
      `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status);
  }

  return response;
}

// Server-side fetch utility that automatically includes cookies
export async function fetchWithCookies(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
      ...options.headers,
    },
    // Next.js server components should not cache API routes by default
    cache: "no-store",
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let error: any = { message: "An error occurred" };

    if (contentType && contentType.includes("application/json")) {
      error = await response.json().catch(() => ({
        message: `Request failed with status ${response.status}`,
      }));
    } else {
      const text = await response.text().catch(() => "");
      error.message = text || `Request failed with status ${response.status}`;
    }

    // Handle backend error response format: { status: 'fail', message: '...' }
    const errorMessage =
      error.message ||
      error.status ||
      `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status);
  }

  return response;
}
