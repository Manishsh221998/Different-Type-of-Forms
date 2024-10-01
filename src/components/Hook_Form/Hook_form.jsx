import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Hook_form.css";
const Hook_form = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const submitHandler = (data) => {
    console.log("Form Submitted", data, "\nImage:", data.profile_image[0]);
  };

  return (
    <section className="text-start d-flex justify-content-center m-4">
      <Form
        className="form_body p-4 border rounded-3 shadow"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="text-center fs-4 pb-3 fw-bold mx-5">
          <Form.Text className="text-info">Hook Registration Form</Form.Text>
        </div>
        <Form.Group className="mb-3" controlId="fName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="txet"
            placeholder="Enter First Name"
            id="fName"
            {...register("fName", { required: "First name is required" })}
          />
          <p className="error_msg">{errors.fName?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="textarea">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            placeholder="Last name"
            type="text"
            id="lName"
            {...register("lName", {
              required: { value: true, message: "Last name is required" },
            })}
          />
          <p className="error_msg">{errors.lName?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email name is required" },
              pattern:{
                value:/^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/,
                message:'Wrong Pattern'
              }
            })}
          />
          <p className="error_msg">{errors.email?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="pwd">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="pwd"
            {...register("pwd", {
              required:{ value: true, message: "Password is required" },
              pattern:{
                value:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$/,
                message:' contains atleast(A-Z,a-z,0-9,!@#$&*)'
              }
            })}
          />
          <p className="error_msg">{errors.pwd?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="profile_image">
          <Form.Label>Choose a profile pic</Form.Label>
          <Form.Control
            type="file"
            id="profile_image"
            {...register("profile_image")}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="outline-dark" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default Hook_form;
