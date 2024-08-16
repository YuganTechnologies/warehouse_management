import React, { useState } from "react"; // Import React here
import { Layout as AuthLayout } from "src/layouts/auth/layout_pin";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router"; // Corrected import from 'next/navigation' to 'next/router'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const auth = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = Array.from({ length: 6 }, () => React.createRef()); // Initialize input refs
  var checkRouter;

  const formik = useFormik({
    initialValues: {
      otp: new Array(6).fill(""), // Initialize as an array
    },
    validationSchema: Yup.object({
      otp: Yup.array().of(
        Yup.string()
          .length(1, "Each OTP field must be exactly 1 character")
          .required("Enter your OTP")
      ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log("Entered OTP:", values.otp.join(""));
        checkRouter = await auth.otpValdation(values.otp);
        if (checkRouter == true) {
          router.push("/auth/reset");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      // Ensure only a single digit is allowed
      const newOtp = [...formik.values.otp];
      newOtp[index] = value;
      formik.setFieldValue("otp", newOtp, false); // Update Formik's state without validation

      // Focus next input
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    formik.handleSubmit(); // Call Formik's handleSubmit manually
  };

  return (
    <>
      <Head>
        <title>Otp Verification | Devias Kit</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "#fff",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 550, px: 3, py: "100px", width: "100%" }}>
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Verification Code</Typography>
              <Typography color="text.secondary" variant="body2">
                Check your registered email for verification
              </Typography>
            </Stack>
            <form noValidate onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2} justifyContent="center">
                {formik.values.otp.map((data, i) => (
                  <TextField
                    key={i}
                    value={data}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    inputRef={inputRefs[i]}
                    type="text"
                    sx={{
                      width: "70px",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "50px",
                      fontWeight: 400,
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                      },
                    }}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    InputProps={{
                      sx: {
                        padding: "10px",
                        "&:focus": {
                          outline: "none",
                        },
                      },
                    }}
                  />
                ))}
              </Stack>
              {formik.errors.otp && typeof formik.errors.otp === "string" && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.otp}
                </Typography>
              )}
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
