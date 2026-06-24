import { deleteCookie } from "cookies-next";

export const logOut = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};
