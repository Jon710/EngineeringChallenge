import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function Auth({ repositories }: { repositories: any }) {
  async function createUser(user: any) {
    // TODO: validate user data
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user = { ...user, password: hashedPassword };

    const response = await repositories.auth.createUser(user);

    return response;
  }

  async function signIn(user: any) {
    // TODO: validate user data
    const userFound = await repositories.auth.fetchUser(user);

    if (!userFound.length) {
      return { message: "User not found", statusCode: 404 };
    }

    if (!(await bcrypt.compare(user.password, userFound[0].password))) {
      return { message: "Wrong password", statusCode: 404 };
    }

    const { username, email, id } = userFound[0];

    return {
      user: { username, email, id },
      token: jwt.sign({ email, id }, "bellsant", { expiresIn: "7d" }), // TODO: move secret to env
    };
  }

  return {
    createUser,
    signIn,
  };
}

export default Auth;
