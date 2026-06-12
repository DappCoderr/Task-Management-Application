import userRepository from "../repositories/userRepository.js";

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
  const { password, refreshToken, ...profile } = user.toJSON();
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

export const getAllUsers = async (pagination = {}) => {
  const { limit = 20, offset = 0 } = pagination;
  return userRepository.findAllUsers({ limit, offset });
};

export const deleteAnyUser = async (adminUserId, targetUserId) => {
  if (adminUserId === targetUserId) {
    throw new Error("You cannot delete your own account via this endpoint");
  }
  const user = await userRepository.findUserById(targetUserId);
  if (!user) throw new Error("User not found");
  await userRepository.deleteUser(targetUserId);
  return { message: "User deleted successfully" };
};
