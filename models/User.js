const { Schema, model } = require("mongoose");
const { hash, genSalt, compare } = require("bcryptjs");
const createError = require("http-errors");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: [3, "Firstname must be equal or more than 3 characters"],
      maxlength: [30, "Firstname must be equal or less than 30 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      minlength: [3, "Lastname must be equal or more than 3 characters"],
      maxlength: [30, "Lastname must be equal or less than 30 characters"],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      minlength: [3, "Username must be equal or more than 3 characters"],
      maxlength: [30, "Username must be equal or less than 30 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (
            !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
          ) {
            return false;
          }
          return true;
        },
        message: `Please Enter a more than 8 character and at least one digit one character and one of (@$!%*#?&)`,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "not-set"],
      default: "not-set",
    },
    phoneNumber: {
      type: [String],
      unique: true,
      required: true,
      validate: /^(0|\+98)9\d{9}$/,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "blogger"],
        message: "invalid role ({VALUE}): role is eather admin or blogger",
      },
      default: "blogger",
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("password")) return next();
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    return next();
  } catch (error) {
    next(new createError(500, `user pre save >` + error?.message));
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  enteredPassword
) {
  return compare(enteredPassword, this.password);
};

module.exports = model("User", UserSchema);
