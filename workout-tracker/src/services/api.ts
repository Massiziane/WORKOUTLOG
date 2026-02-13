// src/services/api.ts
export const API_URL = "http://localhost:3000";

// fetch all programs
export async function fetchPrograms() {
  const res = await fetch(`${API_URL}/programs`, {
    credentials: "include",
  });
  return res.json();
}

// fetch all workouts
export async function fetchWorkouts() {
  const res = await fetch(`${API_URL}/workouts`, {
    credentials: "include",
  });
  return res.json();
}

// create Program
export async function createProgram(program: any) {
  const res = await fetch(`${API_URL}/programs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(program),
  });
  return res.json();
}