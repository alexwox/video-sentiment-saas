import { hash } from "bcryptjs";
import { signupSchema, SignupSchemaType } from "~/schemas/auth";
import { db } from "~/server/db";

export async function registerUser(data: SignupSchemaType) {
  try {
    //Server side validation
    const result = signupSchema.safeParse(data);

    if (!result.success) {
      return {
        error: "Invalid data",
      };
    }

    //Call API
    const { name, email, password } = data;

    //Check if user exists

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
