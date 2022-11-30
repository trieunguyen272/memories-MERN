import jwt, { decode } from 'jsonwebtoken';

//wants to like a post
//click the like button => auth middleware(next) => like controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomAuth = token.length < 500;

    let decodedData; //giai ma

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    next(); //neu try dung
  } catch (error) {
    console.log(error);
  }
};
export default auth;
