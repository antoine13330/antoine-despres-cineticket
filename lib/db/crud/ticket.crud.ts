import { Ticket } from "@/lib/types/ticket.type";
import { db } from "../db";

export async function getAllTickets( ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.toArray();
    });

 }

type GetTicket = string;
export async function getTicket( id : GetTicket ) {
    return await db.transaction('r', db.tickets, async () => {
        return db.tickets.get(id);
    });
}


type DeleteTicket = string;
export async function deleteTicket( id : DeleteTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.delete(id);
    });
}


type CreateTicket = Omit<Ticket,'id'>;
export async function createTicket( ticket : CreateTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.add(ticket);
    });
}


type UpdateTicket = {
    id : string,
    expirationDate : string,
    status : string,
}
export async function updateTicket( ticket : UpdateTicket ) {
    return await db.transaction('rw', db.tickets, async () => {
        return db.tickets.update(ticket.id, ticket);
    });
}
