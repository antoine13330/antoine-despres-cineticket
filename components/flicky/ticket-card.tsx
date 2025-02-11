'use client'
import { Ticket, TicketStatus } from "@/lib/types/ticket.type"
import { Card, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useMemo } from "react"
import { CheckIcon, ClockIcon, EllipsisVertical, FileQuestion, XIcon } from "lucide-react"
import useTicketStore from "@/lib/store/ticket.store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import Image from "next/image"
import moment from "moment"
import { deleteTicketFromDB, updateTicketFromDB } from "@/lib/db/crud/ticket.crud"
type Props = {
    skeleton?: boolean;
    ticket?: Ticket
}
type TicketStatusInfos = {
    color: string;
    icon: any
}
export default function TicketCard({
    ticket,
    skeleton
}: Props) {
    const { updateTicket, removeTicket } = useTicketStore()
    const ticketStatusInfos = useMemo<TicketStatusInfos>(() => {
        const iconSize = 24;
        switch (ticket.status) {
            case TicketStatus.CONSUMED:
                return { color: 'bg-red-500', icon: <XIcon size={iconSize} /> }
            case TicketStatus.EXPIRED:
                return { color: 'bg-red-400', icon: <ClockIcon size={iconSize} /> }
            case TicketStatus.VALID:
                return { color: 'bg-green-400', icon: <CheckIcon size={iconSize} /> }
            default:
                return { color: 'bg-gray-400', icon: <FileQuestion size={iconSize} /> }
        }
    }, [ticket.status])

    const getAdditionalText = () => {
        if ( ticket.status === TicketStatus.CONSUMED ) {
            return 'Consumed';
        }
        if (moment(ticket.expirationDate).isBefore(moment())) {
            if (ticket.status !== TicketStatus.EXPIRED) updateTicket({ ...ticket, status: TicketStatus.EXPIRED });
            return 'Expired ' + moment(ticket.expirationDate).fromNow();
        }
        return 'Expires ' + moment(ticket.expirationDate).fromNow();
    }

    const onDeleteTicket = () => {
        deleteTicketFromDB(ticket.id).then(() => {
            removeTicket(ticket);
        });
    }

    const onConsumedTicket = () => {
        updateTicketFromDB({ id: ticket.id, status: TicketStatus.CONSUMED, expirationDate: ticket.expirationDate }).then(() => {
            updateTicket({ ...ticket, status: TicketStatus.CONSUMED });
        });
    }
    const onRevalidateTicket = () => {
        updateTicketFromDB({ id: ticket.id, status: TicketStatus.VALID, expirationDate: ticket.expirationDate }).then(() => {
            updateTicket({ ...ticket, status: TicketStatus.VALID });
        });
    }


    return (
        <>
            {
                !skeleton && (
                    <Card className="flex flex-col p-0  rounded-md  w-full">
                        <div className="flex justify-between items-center p-4">
                            <div className="flex gap-2 items-center">
                                <Badge className={cn("rounded-full overflow-hidden aspect-square h-6 p-1", ticketStatusInfos.color)}>
                                    {ticketStatusInfos.icon}
                                </Badge>
                                <span className="text-sm font-semibold text-muted-foreground">
                                    {getAdditionalText()}
                                </span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button asChild variant="ghost" className="w-8 h-8 p-2 aspect-square">
                                        <EllipsisVertical size={12} />
                                    </Button>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={onDeleteTicket}
                                    >Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-full h-full overflow-hidden">
                            <Image src={ticket.base64Image} alt="ticket" width={200} height={200} className="w-full h-full object-contain" />
                        </div>
                        <div className="p-4">
                            {
                                ticket.status === TicketStatus.VALID && (
                                    <Button variant="outline" className="w-full" onClick={onConsumedTicket}>
                                        Mark as consumed
                                    </Button>
                                )
                            }
                            {
                                ticket.status === TicketStatus.CONSUMED && (
                                    <Button variant="outline" className="w-full" onClick={onRevalidateTicket}>
                                        Revalidate
                                    </Button>
                                )
                            }
                        </div>
                    </Card>
                )
            }
            {
                skeleton && (
                    <Skeleton className="h-64" />
                )
            }
        </>


    )
}



