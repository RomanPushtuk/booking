export const getHostById = (data: { id: string }): string => {
  const { id } = data;
  return `SELECT * FROM \`hosts\` WHERE \`id\` = '${id}';`;
};
