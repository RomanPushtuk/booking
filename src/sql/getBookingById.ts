export const getBookingById = (data: { id: string }): string => {
  const { id } = data;
  return `SELECT * FROM \`bookings\` WHERE \`id\` = '${id}';`;
};
