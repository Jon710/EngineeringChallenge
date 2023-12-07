function Auth({ db }: any) {
  async function createUser(user: any) {
    try {
      const { username, email, password } = user;

      await db.raw(
        `INSERT INTO public.users (username, email, password) values (:username, :email, :password)`,
        { username, email, password }
      );

      return { message: "User created", statusCode: 201 };
    } catch (error) {
      return { message: "Internal server error", statusCode: 500 };
    }
  }

  async function fetchUser(user: any) {
    try {
      const userFound = await db.raw(
        `SELECT * FROM public.users where (public.users.email = :email)`,
        { email: user.email }
      );

      return userFound.rows;
    } catch (error) {
      return { message: "Internal server error", statusCode: 500 };
    }
  }

  return {
    createUser,
    fetchUser,
  };
}

export default Auth;
