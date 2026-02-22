export const API_URL = import.meta.env.PROD  ? 'https://wlbackend.onrender.com' : 'http://localhost:3000'

// sync function
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

// CREATE helper function
export async function createRecord(endpoint: string, record: any) {
  try{
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  return res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    return [];
  }
}

// fetch all helper function
export async function fetchRecords<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    return [];
  }
}

// fetch by id helper function 
export async function fetchRecordById<T>(endpoint: string, id: number): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint} ${id}:`, err);
    return null;
  }
}

// PUT helper function
export async function updateRecord(endpoint: string, id: number, updates: any) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    console.error(`Failed to update ${endpoint} ${id}:`, err);
    return null;
  }
}


// DELETE helper function
export async function deleteRecord(endpoint: string, id: number) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error(res.statusText);
    return true;
  } catch (err) {
    console.error(`Failed to delete ${endpoint} ${id}:`, err);
    return false;
  }
}
