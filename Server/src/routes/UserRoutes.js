//External Lib Import
const UserRoutes = require("express").Router();

//Internal Lib Import
const {
  CheckUserAuth,
  CheckAdminAuth,
} = require("../middleware/CheckAuthLogin");
const UserControllers = require("../controller/User/UserControllers");

//User Create
UserRoutes.post(
  "/UserCreate",
  CheckUserAuth,
  CheckAdminAuth,
  UserControllers.UserCreate,
);

//User List
UserRoutes.get(
  "/UserList/:pageNumber/:perPage/:searchKeyword",
  CheckUserAuth,
  UserControllers.UserList,
);

//User Profile
UserRoutes.get(
  "/UserDetails/:id",
  CheckUserAuth,
  CheckAdminAuth,
  UserControllers.UserDetails,
);

//Update User
UserRoutes.patch(
  "/UserUpdate/:id",
  CheckUserAuth,
  CheckAdminAuth,
  UserControllers.UserUpdate,
);

//Delete User
UserRoutes.delete(
  "/UserDelete/:id",
  CheckUserAuth,
  CheckAdminAuth,
  UserControllers.UserDelete,
);

//Profile Details
UserRoutes.get(
  "/ProfileDetails",
  CheckUserAuth,
  UserControllers.ProfileDetails,
);

//Profile Update
UserRoutes.patch(
  "/ProfileUpdate",
  CheckUserAuth,
  UserControllers.ProfileUpdate,
);

//User Change Password
UserRoutes.put(
  "/UserChangePassword",
  CheckUserAuth,
  UserControllers.UserChangePassword,
);

//Send Recovery Otp
UserRoutes.get(
  "/SendRecoveryOtp/:Email",
  UserControllers.SendRecoveryOtp,
);

//Verify Recovary Otp
UserRoutes.get(
  "/VerifyRecoveryOtp/:Email/:OtpCode",
  UserControllers.VerifyRecoveryOtp,
);

//Recovery Reset Pass
UserRoutes.post(
  "/RecoveryResetPass/:Email/:OtpCode",
  UserControllers.RecoveryResetPass,
);



module.exports = UserRoutes;
