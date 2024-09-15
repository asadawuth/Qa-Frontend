import Joi from "joi";

export const registerSchema = Joi.object({
  nameWebsite: Joi.string().trim().required().messages({
    "string.base": "Name is required",
    "string.empty": "Name is required",
  }),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ])
    .required()
    .messages({
      "alternatives.match": "Must be a valid email or a 10-digit mobile number",
      "string.base": "Email or mobile is required",
      "string.email": "Must be a valid email",
      "string.pattern.base": "Must be a valid 10-digit mobile number",
      "any.required": "Email or mobile is required",
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,30}$/)
    .trim()
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 4 and 30 characters long, containing only letters and numbers",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Confirm password does not match",
      "string.empty": "Confirm password cannot be empty",
      "any.required": "Confirm password is required",
    }),
});

export const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().required().messages({
    "string.empty": "Guess your oldpassword",
  }),

  newPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,30}$/)
    .trim()
    .required()
    .messages({
      "string.empty": "Guess your newpassword",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .trim()
    .required()
    .messages({
      "string.empty": "Guess Confirm newpassword",
      "any.only": "Confirm password does not match",
    }),
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
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 4 and 30 characters long, containing only letters and numbers",
      "string.empty": "Guess your newpassword",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .trim()
    .required()
    .messages({
      "string.empty": "please confirm your new password.",
      "any.only": "Confirm password does not match.",
    }),
});

// export const updateDataSchema = Joi.object({
//   firstName: Joi.string().max(50).optional(), // ตัวอักษรไม่เกิน 50
//   lastName: Joi.string().max(50).optional(), // ตัวอักษรไม่เกิน 50
//   nickName: Joi.string().max(25).optional(), // ตัวอักษรไม่เกิน 25
//   tel: Joi.string()
//     .pattern(/^[0-9]{1,10}$/)
//     .optional(), // ไม่เกิน10 ต้องเป็นเลขเท่านั้น
//   age: Joi.string()
//     .pattern(/^[0-9]{1,3}$/)
//     .optional(), // ตัวอักษร ต้องเป็นเลขไม่เกิน 3 หลัก
//   sex: Joi.string().valid("Male", "Female", "Thirdgender").optional(), // ระบุได้แค่ Male หรือ Female หรือ Thirdgender
//   nationality: Joi.string().optional(),
//   address: Joi.optional(), // optional field
//   pinMapGps: Joi.optional(), // optional field
// });

export const updateDataSchema = Joi.object({
  firstName: Joi.string().max(50).optional().messages({
    "string.empty": "Guess your firstName",
    "string.max": "First name must not exceed 50 characters.",
  }),

  lastName: Joi.string().max(50).optional().messages({
    "string.empty": "Guess your LastName",
    "string.max": "Last name must not exceed 50 characters.",
  }),

  nickName: Joi.string().max(25).optional().messages({
    "string.empty": "Guess your nickName",
    "string.max": "Nickname must not exceed 25 characters.",
  }),

  tel: Joi.string()
    .pattern(/^[0-9]{1,10}$/)
    .optional()
    .messages({
      "string.empty": "Guess your number mobile",
      "string.pattern.base":
        "Telephone number must be a numeric value with a maximum of 10 digits.",
    }),

  age: Joi.string()
    .pattern(/^[0-9]{1,3}$/)
    .optional()
    .messages({
      "string.empty": "Guess your age",
      "string.pattern.base":
        "Age must be a numeric value with a maximum of 3 digits.",
    }),

  sex: Joi.string().valid("Male", "Female", "Thirdgender").optional().messages({
    "string.empty": "Guess your sex",
    "any.only":
      "Sex must be one of the following: Male, Female, or Thirdgender.",
  }),

  nationality: Joi.string().optional().messages({
    "string.empty": "Guess your Nationality",
  }),
  address: Joi.optional(), // Optional field, no validation needed

  pinMapGps: Joi.optional(), // Optional field, no validation needed
});

export const createTitleSchema = Joi.object({
  titlePost: Joi.string()
    .min(1)
    .max(50) // Adjust length as needed
    .required(), // Make titlePost a required field
  storyTest: Joi.string().optional(), // Allow storyTest to be optional
});
