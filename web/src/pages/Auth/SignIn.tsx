import { Alert, Box, Button, Input, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconKey } from "@tabler/icons-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../contexts/APIContext";
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
    <Box>
      {!!signInError && (
        <Alert variant="light" color="red" title="Error!" mt="xl">
          {signInError}
        </Alert>
      )}
      <Box
        component="form"
        className={classes.inputBox}
        onSubmit={form.onSubmit(async () => {
          try {
            if (form.values.emailOrUsername.includes("@")) {
              await auth.signIn.email({ email: form.values.emailOrUsername, password: form.values.password });
            } else {
              await auth.signIn.username({ username: form.values.emailOrUsername, password: form.values.password });
            }
            navigate("/");
          } catch (error) {
            console.error(error);
            form.reset();
            setSignInError("Invalid email or password.");
          }
        })}>
        <Input
          variant="filled"
          required
          placeholder="Your email or username"
          leftSection={<IconAt size={16} />}
          w="100%"
          id="email"
          {...form.getInputProps("email")}
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
        <Link to="/auth/forgot-password" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none", width: "max-content" }}>
          <Text size="sm" mt="xs">
            Forgot password?
          </Text>
        </Link>
        <Button variant="light" color="vsus-button" mt="lg" w="100%" type="submit">
          Sign in
        </Button>
      </Box>
      <Text size="sm" ta="center" mt="xl">
        Don't have an account?{" "}
        <Link to="/auth/signup" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
          Sign up
        </Link>
      </Text>
    </Box>
  );
}
