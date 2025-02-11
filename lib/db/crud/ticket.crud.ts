import { Ticket } from "@/lib/types/ticket.type";
import { db } from "../db";

export const getAllTickets = db.transaction('r', db.ticket, function* () {
    return yield db.ticket.toArray();
});


type GetTicket = string;
export const getTicket = db.transaction('r', db.ticket, function* (id : GetTicket) {
    return yield db.ticket.get(id);
});


type DeleteTicket = string;
export const deleteTicket = db.transaction('rw', db.ticket, function* (id: DeleteTicket) {
    return yield db.ticket.delete(id);
});

type CreateTicket = Omit<Ticket,'id'>;
export const createTicket = db.transaction('rw', db.ticket, function* (ticket: CreateTicket) {
    return yield db.ticket.add(ticket);
});


type UpdateTicket = {
    id : string,
    expirationDate : string,
    status : string,
}
export const updateTicket = db.transaction('rw', db.ticket, function* (ticket: UpdateTicket) {
    return yield db.ticket.update(ticket.id, ticket);
})


