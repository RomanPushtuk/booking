POST /auth/register
RequestBody
    CreateUserDTO
        email: string;
        password: string;
        role: string;
Response
    token: string

POST /auth/login
RequestBody
    LoginUserDTO 
        email: string;
        password: string;
Response
    token: string

GET /clients/me
Role client
Response
    ClientDTO
        id: string;

DELETE /clients/me
Role client
RequestBody
Response
    id: string; // id of deleted user

GET /me/bookings
Role client
RequestBody
    QueryParams
        sort-direction: string = "desc",
        sort-property: string = "date",
        dateFrom: string = moment().format("YYYY-MM-DD"),
        dateTo: string,
        timeFrom: string = "0:00",
        timeTo: string = "23:59",
Response
    BookingDTO[]
        id: string; // evjw72c1
        clientId: string; // 82jhnzi2
        hostId: string; // 9j1hj2nx
        date: string; // 2024-12-01
        time: { from: string; to: string }; // { from: "09:00"; to: "10:00" }

POST /me/bookings
Role client
RequestBody
    CreateBookingDTO
        hostId: string; // 9j1hj2nx
        date: string; // 2024-12-01
        time: { from: string; to: string }; // { from: "09:00"; to: "10:00" }
Response
    id: string; // id of created booking

POST /me/bookins/:bookingId/cancel
Role client
Params
    bookingId: string // evjw72c1
ReuestBody
Response
    id: string; // id of created booking