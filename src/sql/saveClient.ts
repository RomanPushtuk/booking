interface ClientDbModel {
  id: string;
  isDeleted: boolean;
}

export const saveClient = (clientModel: ClientDbModel): string => {
  const { id, isDeleted } = clientModel;
  return `INSERT INTO \`clients\` (\`id\`, \`isDeleted\`) VALUES ('${id}', ${isDeleted});`;
};
