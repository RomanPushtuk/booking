Rest API

--- Host API ---

POST /host
request: {
    workHours: [
        {from: '9am', to: '1pm'},
        {from: '2pm', to: '6pm'},
    ],
    workDays: ['monday', 'tuesday'],
    forwardBooking: '1 week',
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',
    },
    tags: ['low consulting', 'it consulting'],
}
response: {
    id: '29170a32-1c01-46ca-b76a-19695c798da4',
}

GET /hosts?search=Roman Pushtuk&tags=low consulting
response: {
    hosts: [
        id: '29170a32-1c01-46ca-b76a-19695c798da4',
        workHours: [
            {from: '9am', to: '1pm'},
            {from: '2pm', to: '6pm'},
        ],
        workDays: ['monday', 'tuesday'],
        forwardBooking: '1 week',
        info: {
            firstName: 'Roman',
            lastName: 'Pushtuk',
        },
        tags: ['low consulting', 'it consulting'],
    ]
}

GET /host/:id
response: {
    id: '29170a32-1c01-46ca-b76a-19695c798da4',
    workHours: [
        {from: '9am', to: '1pm'},
        {from: '2pm', to: '6pm'},
    ],
    workDays: ['monday', 'tuesday'],
    forwardBooking: '1 week',
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',
    },
    tags: ['low consulting', 'it consulting'],
}

PATCH /host/:id 
request: {
    workHours: [
        {from: '9am', to: '1pm'},
        {from: '2pm', to: '6pm'},
    ],
    workDays: ['monday', 'tuesday', 'wednesday'],
    forwardBooking: '1 week',
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',
    },
    tags: ['low consulting', 'it consulting'],
}
response: {
    id: '29170a32-1c01-46ca-b76a-19695c798da4',
}

DELETE /host/:id
response: {
    id: '29170a32-1c01-46ca-b76a-19695c798da4',
}


GET /host/:id/bookings?fromDate=25.07.2024&toDate=26.07.2024&groupBy=day&order=date,asc
responce: {
    bookings: [
        {
            status: 'idle',
            client: {
                id: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
                info: {
                    firstName: 'Roman',
                    lastName: 'Pushtuk', 
                }
            },
            date: '25.07.2025+3UTC',
            time: { from: '9am', to: '9:30am' }
        }
    ]
}



--- Client API ---


POST /client
request: {
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',    
    }
}
response: {
    id: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
}

GET /client/:id
responce: {
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',     
    }
}

PATCH /client/:id
request: {
    info: {
        firstName: 'Roman',
        lastName: 'Pushtuk',     
    }
}
response: {
    id: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
}

DELETE /client/:id
responce: {
    id: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
}

GET /client/:id/bookings?fromDate=25.07.2024&toDate=26.07.2024&groupBy=day&order=date,asc
responce: {
    bookings: [
        {
            status: 'idle',
            host: {
                id: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
                info: {
                    firstName: 'Roman',
                    lastName: 'Pushtuk', 
                },
                tags: ['low consulting', 'it consulting'],
            },
            date: '25.07.2025+3UTC',
            time: { from: '9am', to: '9:30am' }
        }
    ]
}


--- Booking API ---


POST /booking
request: {
    hostId: '29170a32-1c01-46ca-b76a-19695c798da4',
    clientId: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
    date: '25.07.2025+3UTC',
    time: { from: '9am', to: '9:30am' },
}
response: {
    id: '122e1968-35f3-4af1-acb7-b7eaad7dcb40',
}

GET /booking/:id
response: {
    id: '122e1968-35f3-4af1-acb7-b7eaad7dcb40',
    status: 'idle',
    hostId: '29170a32-1c01-46ca-b76a-19695c798da4',
    clientId: '604ac77a-f4af-44ec-9b5a-a82ce3f7b6e2',
    date: '25.07.2025+3UTC'
    time: { from: '9am', to: '9:30am' }
}

PATCH /booking/:id
request: {
    status: 'in_progress',
    date: '25.07.2025+3UTC',
    time: { from: '9am', to: '9:30am' },
}
response {
    id: '122e1968-35f3-4af1-acb7-b7eaad7dcb40',
}

DELETE /booking/:id
responce: {
    id: '122e1968-35f3-4af1-acb7-b7eaad7dcb40',
}