import React from "react";
import styled from "styled-components";
import { Table, Avatar, Spin, Modal, Button } from "antd";
import Footer from "components/footer/Footer";
import { IStudent, getAllStudents, addNewStudnet } from "api/studentApi";
import AddStudentForm from "components/form/AddStudentForm";
import { errorNotification } from "Notification";

export default function App() {
  const [students, setStudents] = React.useState<IStudent[]>([]);
  const [state, setState] = React.useState({
    isStudentFetching: false
  });
  const [isAddStudentModalVisible, setIsStudentModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const columns = [
    {
      title: "",
      key: "avatar",
      render: (text: number, student: IStudent) => (
        <Avatar size="large">{`${student.firstName[0].toUpperCase()}${student.lastName[0].toUpperCase()}`}</Avatar>
      )
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    }
  ];

  const Container = (props: any) => (
    <div style={{ width: "1400px", margin: "0 auto", textAlign: "center" }}>{props.children}</div>
  );

  const showModal = React.useCallback(() => {
    setIsStudentModalVisible(true);
  }, []);

  const handleModalOk = React.useCallback(() => {
    setIsStudentModalVisible(false);
  }, []);

  const handleModalCancle = React.useCallback(() => {
    setIsStudentModalVisible(false);
  }, []);

  const fetchStudents = React.useCallback(async () => {
    try {
      setState({ ...state, isStudentFetching: true });
      if (state.isStudentFetching) return;

      const students = await getAllStudents();
      setStudents(students);
    } catch (error: any) {
      const message = error.message;
      console.log(message);
      errorNotification(message, message);
    } finally {
      setState({ ...state, isStudentFetching: false });
    }
  }, [state]);

  return (
    <Wrapper>
      <Container>
        <Modal title="Basic Modal" visible={isAddStudentModalVisible} onOk={handleModalOk} onCancel={handleModalCancle}>
          <AddStudentForm onSuccess={handleModalCancle}></AddStudentForm>
        </Modal>
        <h1>Hello World Spri ng Boot & React</h1>
        {students?.length ? (
          [<Table key="" dataSource={students} columns={columns} rowKey="studentId"></Table>]
        ) : (
          <Spin></Spin>
        )}
        <Footer showModal={showModal}></Footer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
