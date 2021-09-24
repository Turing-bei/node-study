import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求地址
 */
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 默认异常处理器
 */
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('🙅', error.message);
  }

  let statusCode: number, message: string;

  /**
   * 处理异常
   */
  switch (error.message) {
    case 'MAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409;
      message = '用户名已被占用';
      break;
    case 'USER_DOES_NOT_EXIST':
      statusCode = 400;
      message = '用户不存在';
      break;
    default:
      statusCode = 500;
      message = '服务器异常';
      break;
  }

  response.status(statusCode).send({ message });
};
