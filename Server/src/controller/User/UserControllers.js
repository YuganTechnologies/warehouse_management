//Internal Lib Import
const mongoose = require("mongoose");

//Internal Lib Import
const UserModel = require("../../model/User/UserModel");
const OtpModel = require("../../model/Otps/OtpModel");
const UserCreateService = require("../../services/User/UserCreateService");
const UserDetailsService = require("../../services/User/UserDetailsService");
const UserUpdateService = require("../../services/User/UserUpdateService");
const UserPasswordChangeService = require("../../services/User/UserPasswordChangeService");
const UserDeleteService = require("../../services/User/UserDeleteService");
const VerifyRecoveryOtpService = require("../../services/User/VerifyRecoveryOtpService");
const SendRecoveryOtpService = require("../../services/User/SendRecoveryOtpService");
const RecoveryResetPassService = require("../../services/User/RecoveryResetPassService");
const DetailsService = require("../../services/Common/DetailsService");
const UpdateService = require("../../services/Common/UpdateService");
const DropDownService = require("../../services/Common/DropDownService");
const DeleteService = require("../../services/Common/DeleteService");
const UserListService = require("../../services/User/UserListService");
const ListQueryService = require("../../services/Common/ListQueryService");
const ListQueryJoinService = require("../../services/Common/ListQueryJoinService");
const e = require("express");

/**
 * @desc User Create
 * @access private
 * @route /api/v1/User/UserCreate
 * @methud GET
 */
const UserCreate = async (req, res, next) => {
  try {
    const result = await UserCreateService(req, UserModel);
    res.json(result);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

/**
 * @desc User List
 * @access private
 * @route /api/v1/User/UserList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const UserList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [
    {
      FirstName: SearchRgx,
      LastName: SearchRgx,
      Gender: SearchRgx,
      Address: SearchRgx,
      Phone: SearchRgx,
      Email: SearchRgx,
    },
  ];

  try {
    const result = await UserListService(req, UserModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Details
 * @access private
 * @route /api/v1/User/UserDetails
 * @methud GET
 */
const UserDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update User
 * @access private
 * @route /api/v1/User/UserUpdate
 * @methud PATCH
 */
const UserUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc Profile Details
 * @access private
 * @route /api/v1/Profile/ProfileDetails
 * @methud GET
 */
const ProfileDetails = async (req, res, next) => {
  try {
    const result = await UserDetailsService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Profile
 * @access private
 * @route /api/v1/User/ProfileUpdate
 * @methud PATCH
 */
const ProfileUpdate = async (req, res, next) => {
  try {
    const result = await UserUpdateService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Change Password
 * @access private
 * @route /api/v1/User/UserChangePassword
 * @methud PUT
 */
const UserChangePassword = async (req, res, next) => {
  try {
    const result = await UserPasswordChangeService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Delete
 * @access private
 * @route /api/v1/User/UserDelete
 * @methud DELETE
 */

const UserDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, UserModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Send Recovery Otp
 * @access public
 * @route /api/v1/User/SendRecoveryOtp/:Email
 * @methud GET
 */

const SendRecoveryOtp = async (req, res, next) => {
  try {
    const result = await SendRecoveryOtpService(req, UserModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Recovary Otp
 * @access public
 * @route /api/v1/User/VerifyRecoveryOtp/:/Email/:OtpCode
 * @methud GET
 */

const VerifyRecoveryOtp = async (req, res, next) => {
  try {
    const result = await VerifyRecoveryOtpService(req, OtpModel);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @desc Recovery Reset Password
 * @access public
 * @route /api/v1/User/RecoveryResetPass/:Email/:OtpCode
 * @methud POST
 */

const RecoveryResetPass = async (req, res, next) => {
  try {
    const result = await RecoveryResetPassService(req, UserModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  UserCreate,
  UserList,
  UserDetails,
  ProfileDetails,
  ProfileUpdate,
  UserChangePassword,
  UserUpdate,
  UserDelete,
  SendRecoveryOtp,
  VerifyRecoveryOtp,
  RecoveryResetPass
};
