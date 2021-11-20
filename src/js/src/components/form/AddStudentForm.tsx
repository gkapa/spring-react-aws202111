import React from "react";
import styled from "styled-components";
import { Formik, validateYupSchema } from "formik";
import { IStudentForm, addNewStudnet } from "api/studentApi";

const studentFormInitValues: Required<IStudentForm> = {
  firstName: "",
  lastName: "",
  email: "",
  gender: ""
};

interface IProps {
  onSuccess: () => void;
}

export default function fun(props: IProps) {
  return (
    <Wrapper>
      <Formik
        initialValues={{ ...studentFormInitValues }}
        validate={(values) => {
          console.log("values:");
          console.log(values);
          let errors: Partial<IStudentForm> = {};

          if (!values.firstName) {
            errors.firstName = "First Name Required";
          }
          if (!values.lastName) {
            errors.lastName = "Last Name Required";
          }
          if (!values.email) {
            errors.email = "Email Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.gender) {
            errors.gender = "Gender Required";
          } else if (!["MALE", "FEMALE"].includes(values.gender)) {
            errors.gender = "Gender must be (MALE, FEMALE)";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);

            const response = await addNewStudnet(values);
            props.onSuccess();
          } catch (error: any) {
            console.error(error);
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {/* <Input
              className="inputBox"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder="First name. E.g John"
            ></Input>
            {errors.firstName && touched.firstName && <Tag className="errorTag">{errors.firstName}</Tag>}
            <Input
              className="inputBox"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name. E.g Jones"
            ></Input>
            {errors.lastName && touched.lastName && <Tag className="errorTag">{errors.lastName}</Tag>}
            <Input
              className="inputBox"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email. E.g example@gmail.com"
            />
            {errors.email && touched.email && <Tag className="errorTag">{errors.email}</Tag>}
            <Input
              className="inputBox"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              placeholder="Gender. E.g Male or Female"
            />
            {errors.gender && touched.gender && <Tag className="errorTag">{errors.gender}</Tag>}
            <Button type="primary" htmlType="submit" onClick={() => submitForm()} disabled={isSubmitting}>
              Submit
            </Button> */}
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .inputBox {
    margin-bottom: 5px;
  }

  .errorTag {
    background: #f50;
    color: white;
    margin-bottom: 5px;
  }
`;
