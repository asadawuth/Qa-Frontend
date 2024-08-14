import Joi from "joi";

export const registerSchema = Joi.object({
  nameWebsite: Joi.string().trim().required(),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

export const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).trim().required(),
});

export const forgotPasswordSchema = Joi.object({
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).required(),
});

export const verifyOtpSchema = Joi.object({
  otp: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
});

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).trim().required(),
});

export const updateDataSchema = Joi.object({
  firstName: Joi.string().max(50).optional(), // ตัวอักษรไม่เกิน 50
  lastName: Joi.string().max(50).optional(), // ตัวอักษรไม่เกิน 50
  nickName: Joi.string().max(25).optional(), // ตัวอักษรไม่เกิน 25
  tel: Joi.string()
    .pattern(/^[0-9]{1,10}$/)
    .optional(), // ไม่เกิน10 ต้องเป็นเลขเท่านั้น
  age: Joi.string()
    .pattern(/^[0-9]{1,3}$/)
    .optional(), // ตัวอักษร ต้องเป็นเลขไม่เกิน 3 หลัก
  sex: Joi.string().valid("Male", "Female", "Thirdgender").optional(), // ระบุได้แค่ Male หรือ Female หรือ Thirdgender
  nationality: Joi.string().optional(),
  address: Joi.optional(), // optional field
  pinMapGps: Joi.optional(), // optional field
});

export const createTitleSchema = Joi.object({
  titlePost: Joi.string()
    .min(1)
    .max(50) // Adjust length as needed
    .required(), // Make titlePost a required field
  storyTest: Joi.string().optional(), // Allow storyTest to be optional
});
