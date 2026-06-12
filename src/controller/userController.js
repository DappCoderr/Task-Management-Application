import {
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
  deleteAnyUser,
} from "../service/userService.js";

export const getProfileController = async (req, res, next) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const updated = await updateProfile(req.user.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteAccountController = async (req, res, next) => {
  try {
    const result = await deleteAccount(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const users = await getAllUsers({ limit, offset });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteAnyUserController = async (req, res, next) => {
  try {
    const result = await deleteAnyUser(req.user.id, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
