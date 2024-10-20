interface HostDbModel {
  id: string;
  forwardBooking: string;
  workHours: string;
  workDays: string;
  isDeleted: boolean;
}

export const saveHost = (clientModel: HostDbModel): string => {
  const { id, forwardBooking, workDays, workHours, isDeleted } = clientModel;
  return `insert into \`hosts\` (
    \`id\`,
    \`forwardBooking\`,   
    \`workDays\`, 
    \`workHours\`,
    \`isDeleted\`
  ) values (
   '${id}',
   '${forwardBooking}',
   '${workDays}', 
   '${workHours}',
   ${isDeleted}, 
  );`;
};
