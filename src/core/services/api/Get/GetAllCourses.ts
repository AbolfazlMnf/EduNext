export async function GetAllCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return [];
  }
}
