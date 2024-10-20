export const getClientById = (data: { id: string }): string => {
  const { id } = data;
  return `SELECT * from \`clients\` WHERE \`id\` = '${id}';`;
};
