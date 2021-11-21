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
