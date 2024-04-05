import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2dt2ToL3Wo83XQpbRem9EcOtksE",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};