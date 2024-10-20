interface UserDbModel {
  id: string;
}

export const saveUser = (userModel: UserDbModel): string => {
  const { id } = userModel;
  return `insert into \`users\` (\`id\`) values ('${id}');`;
};
