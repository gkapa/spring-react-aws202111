export interface ISignInForm {
  email: string;
  password: string;
}

interface IJwtoDto {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export const submitSignInForm = async (data: ISignInForm) => {
  const response = await fetch(`/api/sign-in`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw await response.json();
  const payload: IJwtoDto = await response.json();
  return payload;
};

export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
}

export const submitSignUpForm = async (data: ISignUpForm) => {
  const response = await fetch(`/api/sign-in`, {
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
