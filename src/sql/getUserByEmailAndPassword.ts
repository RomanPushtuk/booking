export const getUserByEmailAndPassword = (data: {
  email: string;
  password: string;
}): string => {
  const { email, password } = data;
  return `SELECT * \`users\` WHERE \`email\` = '${email}' AND \`password\` = '${password}';`;
};
