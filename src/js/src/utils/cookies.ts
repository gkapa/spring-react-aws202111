import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import * as AuthApi from "api/authApi";

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

export const isAccessTokenValid = async () => {
  const now = Date.now().valueOf() / 1000;
  const accessToken = cookies.get(`accessToken`);
  if (accessToken) {
    const decodedToken: any = jwt_decode(accessToken);
    if (decodedToken.exp > now) {
      return true;
    }
  }

  try {
    const response = await fetch(`/api/token/refresh`, {
      method: `GET`,
      credentials: `same-origin`,
      headers: {
        "X-AUTH-TOKEN": accessToken
      }
    });
  } catch (error) {
    return false;
  }

  return true;

  // console.log({ ...decodedToken });
  // exp: 1637668693
  // iat: 1637668663
  // roles: ['ROLE_USER']
  // sub: "메일주소"
  // username: "유저이름"
  // [[Prototype]]: Object
};
