"use client";
export async function fetcher<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T | undefined> {
  try {
    const authHeaderString = localStorage.getItem("auth-header");
    const authHeader = authHeaderString ? JSON.parse(authHeaderString) : null;

    const headers = {
      "Content-Type": "application/json",
      ...init?.headers,
      origin: "http://localhost:3000",
      uid: authHeader.uid || "",
      Authorization: "Bearer " + authHeader.access || "",
    };
    console.log(headers, input, init);
    const response = await fetch(input, {
      ...init,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  } catch (error) {
    throw new Error(`Response status: ${error}`);
  }
}
