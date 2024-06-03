import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout-resetpass";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("password");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, "Must be a valid password")
        .max(255)
        .required("Password is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .max(255)
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.resetpass(values.password, values.confirmpassword);
        // router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  

  return (
    <>
      <Head>
        <title>Login | Devias Kit</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "#",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Create Password</Typography>
              <Typography color="text.secondary" variant="body2">
                Enter your new password to login
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.confirmpassword && formik.errors.confirmpassword)}
                  fullWidth
                  helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                  label="Confirm Password"
                  name="confirmpassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirmpassword}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Reset Password
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
