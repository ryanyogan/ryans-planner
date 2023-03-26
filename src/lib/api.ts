export async function fetcher({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: "GET" | "POST";
  body: object | string;
  json: boolean;
}) {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
}

//TODO: Extract
//TODO: Define User Type
export async function register(user: any) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
}

export async function signin(user: { email: string; password: string }) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
}
