import { Ticket } from "@/lib/types/ticket.type";
import { db } from "../db";

export async function getAllTicketsFromDB( ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.toArray();
    });

 }

type GetTicket = string;
export async function getTicketFromDB( id : GetTicket ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.get(id);
    });
}


type DeleteTicket = string;
export async function deleteTicketFromDB( id : DeleteTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.delete(id);
    });
}


type CreateTicket = Omit<Ticket,'id'>;
export async function createTicketFromDB( ticket : CreateTicket ) {
    const id = await db.transaction('rw', db.tickets, async () => {
        return db.tickets.add(ticket);
    });
    return await getTicketFromDB(id);
}


type UpdateTicket = {
    id : string,
    expirationDate : string,
    status : string,
}
export async function updateTicketFromDB( ticket : UpdateTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.update(ticket.id, ticket);
    });
}
