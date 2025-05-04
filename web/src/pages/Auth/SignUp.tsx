import { Alert, Button, Flex, Input, PasswordInput, Text } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconAt, IconIdBadge2, IconKey, IconKeyFilled, IconUser } from "@tabler/icons-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../contexts/APIContext";
import "../../css/center.css";
import classes from "./index.module.css";

export default function SignUp() {
  const navigate = useNavigate();

  const { auth } = useAppContext();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: (value) => (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? null : "Invalid email"),
      name: (value) => (value.length < 2 ? "Name too short" : null),
      username: (value) => (value.length > 64 ? "Username too long" : null),
      password: (value) => (value.length < 6 ? "Password too short" : null),
      passwordConfirm: (value, values) => (value !== values.password ? "Passwords do not match" : null),
    },
  });

  const [signUpError, setSignUpError] = useState("");

  return (
    <Flex className="center" direction="column">
      {!!signUpError && (
        <Alert variant="light" color="red" title="Error!" mt="xl">
          {signUpError}
        </Alert>
      )}
      <Form
        className={classes.inputBox}
        form={form}
        onSubmit={async () => {
          const response = await auth.signUp.email({
            email: form.values.email,
            name: form.values.name,
            password: form.values.password,
            username: form.values.username,
          });

          if (response.error) {
            setSignUpError(response.error.message ?? "Unknown error");
            return;
          }

          navigate("/");
        }}>
        <Input
          variant="filled"
          required
          placeholder="Your name"
          leftSection={<IconIdBadge2 size={16} />}
          w="100%"
          id="email"
          {...form.getInputProps("name")}
        />

        <Input
          variant="filled"
          required
          placeholder="Your email"
          leftSection={<IconAt size={16} />}
          mt="lg"
          w="100%"
          id="email"
          {...form.getInputProps("email")}
        />

        <Input
          variant="filled"
          required
          placeholder="Your username"
          leftSection={<IconUser size={16} />}
          mt="lg"
          w="100%"
          id="email"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          variant="filled"
          required
          placeholder="Your password"
          leftSection={<IconKey size={16} />}
          mt="lg"
          w="100%"
          id="password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          variant="filled"
          required
          placeholder="Confirm password"
          leftSection={<IconKeyFilled size={16} />}
          mt="lg"
          w="100%"
          id="password"
          {...form.getInputProps("passwordConfirm")}
        />

        <Button variant="light" mt="lg" w="100%" type="submit">
          Sign up
        </Button>
      </Form>
      <Text size="sm" ta="center" mt="xl">
        Have an account?{" "}
        <Link to="/auth/signin" style={{ textDecoration: "none" }}>
          Sign in
        </Link>
      </Text>
    </Flex>
  );
}
