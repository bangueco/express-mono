import httpStatusCode from "@lib/utils/httpStatusCode";
import authService from "@services/authService";
import { NextFunction, Request, Response } from "express";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = request.body as RegisterRequest;

    const { accessToken, user } = await authService.register(firstName, lastName, email, password);

    response.status(httpStatusCode.CREATED).json({
      message: "User registered successfully!",
      user,
      token: accessToken
    });

    return;
  } catch (error) {
    return next(error);
  }
};

const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body as LoginRequest;

    const { accessToken, user } = await authService.login(email, password);

    response.status(httpStatusCode.OK).json({
      message: "Login successfully!",
      user,
      token: accessToken
    });

    return;
  } catch (error) {
    return next(error);
  }
};

export default {
  register, login
};