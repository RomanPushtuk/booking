interface ClientDbModel {
  id: string;
  isDeleted: boolean;
}

export const saveClient = (clientModel: ClientDbModel): string => {
  const { id, isDeleted } = clientModel;
  return `MERGE INTO \`clients\` (\`id\`, \`isDeleted\`) VALUES ('${id}', ${isDeleted});`;
};
