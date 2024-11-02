"use client";
export async function fetcher<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T | undefined> {
  try {
    const authHeaderString = localStorage.getItem("auth-header");
    const authHeader = authHeaderString ? JSON.parse(authHeaderString) : null;

    const headers = {
      ...init?.headers,
      origin: "http://localhost:3000",
      uid: authHeader.uid || "",
      Authorization: "Bearer " + authHeader.access || "",
    } as any;
    if (!(init?.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    console.log({
      ...init,
      headers,
    });
    const response = await fetch(input, {
      ...init,
      headers,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  } catch (error) {
    throw new Error(`Response status: ${error}`);
  }
}
