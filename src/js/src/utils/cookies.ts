import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setAccessToken = (accessToken: string) => {
  setCookie("accessToken", accessToken, {
    path: "/",
    secure: true,
    sameSite: "none"
  });
  console.log(`token set: ${accessToken}`);
};

export const getAccessToken = () => {
  return cookies.get(`accessToken`);
};
