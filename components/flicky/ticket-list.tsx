'use client'
import TicketCard from "./ticket-card";
import { getAllTickets } from "@/lib/db/crud/ticket.crud";
import { useEffect, useState } from "react";
import { Ticket } from "@/lib/types/ticket.type";

export default function TicketList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        getAllTickets().then(tickets => {
            setTickets(tickets);
        });
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {
                tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            }
        </div>
    )
}