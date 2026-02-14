export const API_URL = "http://localhost:3000";

export async function syncUser(user: any) {
  const res = await fetch(`${API_URL}/users/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clerkId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.emailAddresses[0]?.emailAddress,
      username: user.username || "",
    }),
  });
  return res.json(); // returns DB user with numeric id
}

export async function createRecord(endpoint: string, record: any) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  return res.json();
}
