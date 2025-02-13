import { Ticket } from "@/lib/types/ticket.type";
import { db } from "../db";

export async function getAllTicketsFromDB( ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.toArray();
    });

 }

type GetTicket = number;
export async function getTicketFromDB( id : GetTicket ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.get(id);
    });
}


type DeleteTicket = number;
export async function deleteTicketFromDB( id : DeleteTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.delete(id);
    });
}


type CreateTicket = Omit<Ticket,'id'>;
export async function createTicketFromDB( ticket : CreateTicket ) {
    const id = await db.transaction('rw', db.tickets, async () => {
        return db.tickets.add(ticket as Ticket);
    });
    return await getTicketFromDB(id);
}


type UpdateTicket = {
    id : number,
    expirationDate : string,
    status : string,
}
export async function updateTicketFromDB( ticket : UpdateTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.update(ticket.id, ticket as Ticket);
    });
}
