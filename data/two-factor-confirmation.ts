import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmationByUserId =
      await db.twoFactorConfirmation.findUnique({
        where: {
          userId,
        },
      });
    return twoFactorConfirmationByUserId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
