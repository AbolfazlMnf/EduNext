export async function GetAllCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}
