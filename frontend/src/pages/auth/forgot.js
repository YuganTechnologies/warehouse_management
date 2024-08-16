import { Layout as AuthLayout } from "src/layouts/auth/layout-forgot";
import { Box, Button,Link, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  var checkRouter;
  const [method, setMethod] = useState("email");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log("this value comes with forgot" , values.email);
        checkRouter = await auth.forgot(values.email);
        console.log(checkRouter);
        if(checkRouter == true){
          router.push("/auth/otpverfication");
        }
        // router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

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
            {/* Input top heading */}
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Forgot password</Typography>
              <Typography color="text.secondary" variant="body2">
                You know the password? &nbsp;
                <Link
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Login
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
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
