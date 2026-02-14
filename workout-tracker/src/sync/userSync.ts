import { useUser } from "@clerk/clerk-react";

const { user } = useUser();

export async function syncUser() {
  if (!user) return;

  const res = await fetch("http://localhost:3000/users/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      username: user.username,
    }),
  });

  const syncedUser = await res.json();
  console.log("DB user synced:", syncedUser);
}
