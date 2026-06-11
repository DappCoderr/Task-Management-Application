import userRepository from "../repositories/userRepository";

export const register = async ({ name, email, password, role }) => {
  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    throw new Error("Email already in use");
  }
  return userRepository.createUser({ name, email, password, role });
};

export const getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error("User not found");
  const { password, ...profile } = user.toJSON();
  return profile;
};

export const updateProfile = async (userId, data) => {
  delete data.role;
  delete data.id;
  const user = await userRepository.updateUser(userId, data);
  if (!user) throw new Error("User not found");
  return user;
};

export const deleteAccount = async (userId) => {
  const success = await userRepository.deleteUser(userId);
  if (!success) throw new Error("User not found");
  return { message: "Account deleted" };
};