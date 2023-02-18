import bcrypt from "bcryptjs";

const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  return hashedPwd;
};

export default hashPassword;
