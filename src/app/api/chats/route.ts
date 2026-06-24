import { ICourseResult } from "@/core/services/api/Get/GetAllCourses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const coursesResponse = (await fetch(
    `${process.env.SERVER_API_BASE_URL}/courses?limit=1000`,
    {
      next: { revalidate: 60 * 3 },
    },
  )
    .then((res) => res.json())
    .catch(() => ({ data: [] }))) as ICourseResult;
  const courses = coursesResponse.data.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    teacherName: item.teacherName,
    price: item.price,
  }));

  const systemPrompt = {
    role: "system",
    content: `
    You are the assistant of an online learning platform.

       Available courses:
       ${JSON.stringify(courses)}

        Answer user questions using these courses.
       If recommending a course, use this format:

       Course URL:
        ${process.env.SERVER_SITE_URL}/courses/<course_id>

     Replace <course_id> with the actual id `,
  };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ASSISTANT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "cohere/north-mini-code:free",
        messages: [systemPrompt, ...messages],
        reasoning: { enabled: true },
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { message: "bad request", data: await res.json() },
        { status: 400 },
      );
    }
    return NextResponse.json({ data: await res.json() }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
