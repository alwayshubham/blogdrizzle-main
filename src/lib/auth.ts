import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string; username: string };
  } catch (err) {
    console.log(err);
    return null;
  }
}
