import bcrypt from "@lib/bcrypt";
import { ApiError, ValidationError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import { User } from "@prisma/client";
import userRepository from "@repositories/userRepository";

const findById = async (userId: number) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  return user;
};

const findByEmail = async (email: string) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  return user;
};

const createUser = async (firstName: string, lastName: string,
  email: string, password: string
) => {
  const existingEmail = await userRepository.findByEmail(email);

  if (existingEmail) {
    throw new ValidationError(httpStatusCode.BAD_REQUEST, "email", "Email is already taken!");
  }

  const hashedPassword = bcrypt.hashPassword(password);

  return await userRepository.createUser(firstName, lastName, email, hashedPassword);
};

const updateUser = async (userId: number, userData: Partial<User>) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  return await userRepository.updateUser(userId, userData);
};

const deleteUser = async (userId: number) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  return await userRepository.deleteUser(userId);
};

export default {
  findById, findByEmail, createUser, updateUser, deleteUser
};