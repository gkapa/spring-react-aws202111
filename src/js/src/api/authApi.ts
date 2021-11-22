export interface ISignInForm {
  email: string;
  name: string;
  password: string;
}

export const getAllStudents = async () => {
  const response = await fetch(`/api/students/getAll`);
  if (!response.ok) throw await response.json();
  return await response.json();
};

export const getRegistResult = async () => {
  const registKey = new URLSearchParams(window.location.search).get("key");
  const email = new URLSearchParams(window.location.search).get("email");
  const response = await fetch(`/api/user/regist?key=${registKey};email=${email}`);
  if (!response.ok) throw await response.json();
};
