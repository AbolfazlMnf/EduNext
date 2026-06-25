import UserCoursesView from "@/modules/panels/user-panel/UserCourses/views/UserCoursesView";

import React from "react";

const UserCoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const sparams = await searchParams;
  const params = {
    search: sparams?.search ?? "",
    page: sparams.page ?? "1",
    limit: sparams.limit ?? "9",
    sort: sparams.sort ?? "",
  };
  return (
    <>
      <UserCoursesView params={params} />
    </>
  );
};

export default UserCoursesPage;
