export type EditProfileDTO = Partial<{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
}>;
