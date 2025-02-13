'use client'
import TicketCard from "./ticket-card";
import { useEffect, useState } from "react";
import useTicketStore from "@/lib/store/ticket.store";
import { getAllTicketsFromDB } from "@/lib/db/crud/ticket.crud";

export default function TicketList() {
    const [loading, setLoading] = useState(true);
    const { tickets, initTickets } = useTicketStore();
    useEffect(() => {
        getAllTicketsFromDB().then(tickets => {
            initTickets(tickets);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [initTickets]);

    return (
        <div className="flex flex-col gap-4 h-full pt-2"> 
            {
                tickets.map((ticket, _) => (
                    <TicketCard key={_} ticket={ticket} />
                ))
            }
            {
                loading && (
                    Array.from({ length: 20 }).map((_, i) => (
                        <TicketCard key={i} skeleton />
                    ))
                )
            }
            {
                !loading && tickets.length === 0 && (

                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg font-semibold text-neutral-400 dark:text-neutral-500">No tickets yet</p>
                    </div>

                )
            }
        </div>
    )
}