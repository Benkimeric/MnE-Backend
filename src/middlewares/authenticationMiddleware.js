import jwt from 'jsonwebtoken';
import ResponseHandler from '../helpers/responseHandler';
import UserHelper from '../helpers/users';

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return ResponseHandler.handleError('Please provide a token', 401, res);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async (error, decodedToken) => {
      let user;
      const userId = decodedToken ? decodedToken.userInfo.userId : '';
      if (!error) user = await UserHelper.findUser(userId);
      if (error || !user) {
        return ResponseHandler.handleError('Token is not valid', 401, res);
      }
      req.userToken = token;
      req.user = user;
      next();
    },
  );
};

export default authenticate;
