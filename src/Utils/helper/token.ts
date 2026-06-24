import { IDecodedToken } from "@/core/services/api/post/Login";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token) as IDecodedToken;
    if (!decoded.exp) return true;
    return Date.now() / 1000 > decoded.exp - 10;
  } catch (err) {
    return true;
  }
};

export const getDecodedToken = (token: string): null | IDecodedToken => {
  try {
    const decoded = jwtDecode(token) as IDecodedToken;
    if (!decoded) {
      return null;
    }
    return decoded;
  } catch (err) {
    return null;
  }
};
