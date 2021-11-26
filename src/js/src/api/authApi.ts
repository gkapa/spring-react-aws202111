import * as cookies from "utils/cookies";

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
}

export const submitSignInForm = async (data: ISignInForm) => {
  const response = await fetch(`/api/user/signIn`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw await response.json();
  // const payload = await response.json();
};

export const submitSignOut = async () => {
  const response = await fetch(`/api/user/signOut`);
  if (!response.ok) throw await response.json();
  return await response.json();
};

export const submitSignUpForm = async (data: ISignUpForm) => {
  const response = await fetch(`/api/user/signUp`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw await response.json();
  return await response.json();
};

export const getRegistResult = async () => {
  const registKey = new URLSearchParams(window.location.search).get("key");
  const email = new URLSearchParams(window.location.search).get("email");
  const response = await fetch(`/api/user/regist?key=${registKey};email=${email}`);
  if (!response.ok) throw await response.json();
};

export const testApi = async () => {
  const response = await fetch(`/api/test/bbb`, {
    method: `GET`,
    credentials: "same-origin",
    headers: {
      "X-AUTH-TOKEN": cookies.getAccessToken()
    }
  });
  if (!response.ok) throw await response.json();
  return await response.json();
};
