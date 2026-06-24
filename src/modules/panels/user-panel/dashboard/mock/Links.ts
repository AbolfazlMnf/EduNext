export type VerticalNavLinkType = {
  title: string;
  link: string;
};
export const VerticalLinks: VerticalNavLinkType[] = [
  {
    title: "Dashboard",
    link: "/panels/user",
  },
  {
    title: "User info",
    link: "/panels/user/userInfo",
  },
  {
    title: "My Courses",
    link: "/panels/user/user-courses",
  },
  {
    title: "Certificates",
    link: "/panels/user/certificates",
  },
];
