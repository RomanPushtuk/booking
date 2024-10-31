export const getUserByEmailAndPassword = (data: {
  email: string;
  password: string;
}): string => {
  const { email, password } = data;
  return `select * from \`users\` where \`email\` = '${email}' and \`password\` = '${password}';`;
};
