interface UserDbModel {
  id: string;
  email: string;
  password: string;
  role: string;
}

export const saveUser = (userModel: UserDbModel): string => {
  const { id, email, password, role } = userModel;
  return `MERGE into \`users\` (
    \`id\`, \`email\`, \`password\`, \`role\`
  ) values ('${id}', '${email}', '${password}', '${role}');`;
};
