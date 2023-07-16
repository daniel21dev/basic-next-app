import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { dbConnect } from ".";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await dbConnect();
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  if (bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { _id, name } = user;

  return {
    _id,
    name,
    email: email.toLowerCase(),
  };
};
