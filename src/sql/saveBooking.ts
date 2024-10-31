interface BookingDbModel {
  id: string;
  clientId: string;
  hostId: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  isСanceled: boolean;
  isDeleted: boolean;
}

export const saveBooking = (bookingModel: BookingDbModel): string => {
  const {
    id,
    clientId,
    hostId,
    dateTimeFrom,
    dateTimeTo,
    isDeleted,
    isСanceled,
  } = bookingModel;
  return `
    MERGE into
      \`bookings\` (
      \`id\`,
      \`clientId\`,
      \`hostId\`,
      \`dateTimeFrom\`,
      \`dateTimeTo\`,
      \`isDeleted\`,
      \`isСanceled\`
    ) values (
     '${id}', 
     '${clientId}', 
     '${hostId}', 
     '${dateTimeFrom}', 
     '${dateTimeTo}', 
     ${isDeleted},
     ${isСanceled}
    );
  `;
};
