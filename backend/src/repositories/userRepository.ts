import prisma from "@lib/prismaClient";
import { User } from "@prisma/client";

const findById = async (userId: number): Promise<User | null> => {
  return await prisma.user.findUnique({where: {userId}});
};

const createUser = async (firstName: string, lastName: string, username: string,
  email: string, password: string
): Promise<User> => {
  return await prisma.user.create({data: {
    firstName,
    lastName,
    username,
    email,
    password
  }});
};

const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  return await prisma.user.update({
    data: userData,
    where: {userId}
  });
};

const deleteUser = async (userId: number) => {
  return await prisma.user.delete({where: {userId}});
};

export default {
  findById, createUser, updateUser, deleteUser
};