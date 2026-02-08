export async function GetAllCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return [];
  }
}
