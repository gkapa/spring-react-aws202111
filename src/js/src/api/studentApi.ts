export interface IStudent {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export interface IStudentForm {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export const getAllStudents = async () => {
  const response = await fetch(`/api/students/getAll`);
  if (!response.ok) throw await response.json();
  return await response.json();
};

export const addNewStudnet = async (data: IStudentForm) => {
  const response = await fetch(`/api/students/addNew`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw await response.json();
  return response;
};
