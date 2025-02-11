'use client'
import TicketCard from "./ticket-card";
import { useEffect, useState } from "react";
import { Ticket } from "@/lib/types/ticket.type";
import useTicketStore from "@/lib/store/ticket.store";
import { getAllTicketsFromDB } from "@/lib/db/crud/ticket.crud";

export default function TicketList() {
    const [loading, setLoading] = useState(true);
    const { tickets, initTickets } = useTicketStore();
    useEffect(() => {
        getAllTicketsFromDB().then(tickets => {
            initTickets(tickets);
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col gap-4 h-full pt-2">
            {
                tickets.map((ticket, _) => (
                    <TicketCard key={_} ticket={ticket} />
                ))
            }
            {
                loading && (
                    <div className="flex justify-center items-center h-full">
                        <span>Loading...</span>
                    </div>
                )
            }
            {
                !loading && tickets.length === 0 && (

                    Array.from({ length: 20 }).map((_, i) => (
                        <TicketCard key={i} skeleton />
                    ))

                )
            }
        </div>
    )
}