// Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword } = require("../../utility/BcryptHelper");

const RegistrationService = async (Request, EmployeesModel) => {
  const { Name, Phone, Email, Password } = Request.body;

  const newEmployee = new EmployeesModel({
    Name,
    Phone: Phone || null,  // Set Phone to null if not provided
    Email,
    Password,
  });
  
  if (!Name || !Email || !Password) {
    throw CreateError("Invalid Data", 400);
  }

  const exitEmployee = await EmployeesModel.aggregate([
    { $match: { $or: [{ Email }, { Phone }] } },  // Include Phone even if it is null
  ]);

  if (exitEmployee && exitEmployee.length > 0) {
    throw CreateError("Employee Already Registered", 400);
  }
  
  newEmployee.Password = await HashPassword(Password);

  const Employee = await newEmployee.save();
  delete Employee._doc.Password;

  return Employee;
};

module.exports = RegistrationService;
