import { Alert, Button, Flex, Input, PasswordInput, Text } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconAt, IconKey } from "@tabler/icons-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../contexts/APIContext";
import "../../css/center.css";
import classes from "./index.module.css";

export default function SignIn() {
  const navigate = useNavigate();

  const { auth } = useAppContext();

  const form = useForm({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },

    validate: {
      emailOrUsername: (value) => (value.length < 2 ? "Email or username too short" : null),
      password: (value) => (value.length < 6 ? "Password too short" : null),
    },
  });

  const [signInError, setSignInError] = useState("");

  return (
    <Flex className="center" direction="column">
      {!!signInError && (
        <Alert variant="light" color="red" title="Error!" mt="xl">
          {signInError}
        </Alert>
      )}
      <Form
        className={classes.inputBox}
        form={form}
        onSubmit={async () => {
          const response = form.values.emailOrUsername.includes("@")
            ? await auth.signIn.email({ email: form.values.emailOrUsername, password: form.values.password })
            : await auth.signIn.username({ username: form.values.emailOrUsername, password: form.values.password });

          if (response.error) {
            setSignInError(response.error.message ?? "Unknown error");
            return;
          }

          navigate("/");
        }}>
        <Input
          variant="filled"
          required
          placeholder="Your email or username"
          leftSection={<IconAt size={16} />}
          w="100%"
          id="email"
          {...form.getInputProps("emailOrUsername")}
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
        <Link to="/auth/forgot-password" style={{ textDecoration: "none", width: "max-content" }}>
          <Text size="sm" mt="xs">
            Forgot password?
          </Text>
        </Link>

        <Button variant="light" mt="lg" w="100%" type="submit">
          Sign in
        </Button>
      </Form>
      <Text size="sm" ta="center" mt="xl">
        Don't have an account?{" "}
        <Link to="/auth/signup" style={{ textDecoration: "none" }}>
          Sign up
        </Link>
      </Text>
    </Flex>
  );
}
