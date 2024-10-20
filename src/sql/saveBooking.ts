interface BookingDbModel {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  isСanceled: boolean;
  isDeleted: boolean;
}

export const saveBooking = (bookingModel: BookingDbModel): string => {
  const {
    id,
    clientId,
    hostId,
    date,
    timeFrom,
    timeTo,
    isDeleted,
    isСanceled,
  } = bookingModel;
  return `
    insert into
    \`bookings\` (
      \`id\`,
      \`clientId\`,
      \`hostId\`,
      \`date\`,
      \`timeFrom\`,
      \`timeTo\`,
      \`isDeleted\`,
      \`isСanceled\`
    ) values (
     '${id}', 
     '${clientId}', 
     '${hostId}', 
     '${date}', 
     '${timeFrom}', 
     '${timeTo}', 
     ${isDeleted},
     ${isСanceled}
    );
  `;
};
