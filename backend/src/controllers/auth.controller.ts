import jwt from "@lib/jwt";
import { cookieConfig } from "@lib/utils/cookies";
import httpStatusCode from "@lib/utils/httpStatusCode";
import { User } from "@prisma/client";
import authService from "@services/auth.service";
import { NextFunction, Request, Response } from "express";

interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

const authenticatedUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {

    const user = request.user;

    response.status(httpStatusCode.OK).json({
      message: "Authenticated user",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};

const refreshUserToken = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = request.cookies;

    const payload = jwt.verifyRefreshToken(refreshToken);

    if (typeof payload !== "string") {
      const user = payload as User;

      const accessToken = jwt.generateAccessToken(user.userId, user.firstName, user.lastName, user.email);

      response.status(httpStatusCode.OK).json({
        message: "Token refreshed successfully!",
        token: accessToken
      });
    }

  } catch (error) {
    next(error);
  }
};

const register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = request.body as IRegisterRequest;

    const { accessToken, refreshToken, user } = await authService.register(firstName, lastName, email, password);

    response.status(httpStatusCode.CREATED)
      .cookie(cookieConfig.refreshToken.name, refreshToken, cookieConfig.refreshToken.options)
      .json({
        message: "User registered successfully!",
        user,
        token: accessToken
      });
  } catch (error) {
    return next(error);
  }
};

const login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = request.body as ILoginRequest;

    const { accessToken, refreshToken, user } = await authService.login(email, password);

    response.status(httpStatusCode.OK)
      .cookie(cookieConfig.refreshToken.name, refreshToken, cookieConfig.refreshToken.options)
      .json({
        message: "Login successfully!",
        user,
        token: accessToken
      });
  } catch (error) {
    return next(error);
  }
};

export default {
  authenticatedUser, refreshUserToken, register, login
};