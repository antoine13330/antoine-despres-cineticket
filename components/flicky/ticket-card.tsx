import { Ticket, TicketStatus } from "@/lib/types/ticket.type"
import { Card, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useMemo } from "react"
import { CheckIcon, ClockIcon, FileQuestion, LucideIcon } from "lucide-react"

type Props = {
    ticket: Ticket
}
type TicketStatusInfos = {
    color: string;
    icon: any
}
export default function TicketCard({
    ticket
}: Props) {

    const ticketStatusInfos = useMemo<TicketStatusInfos>(() => {
        const iconSize = 24;
        switch (ticket.status) {
            case TicketStatus.CONSUMED:
                return { color: 'green', icon: <CheckIcon size={iconSize} /> }
            case TicketStatus.EXPIRED:
                return { color: 'red', icon: <ClockIcon size={iconSize} /> }
            case TicketStatus.VALID:
                return { color: 'yellow', icon: <CheckIcon size={iconSize} /> }
            default:
                return { color: 'gray', icon: <FileQuestion size={iconSize} /> }
        }
    }, [ticket.status])

    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Badge color={ticketStatusInfos.color} className="rounded-full overflow-hidden aspect-square h-8 p-2">
                            {ticketStatusInfos.icon}
                        </Badge>
                    </div>
                    <img src={ticket.base64Image} className="object-cover w-8 h-8" />
                    <Button variant="destructive">Delete</Button>

                </div>
            </CardHeader>
        </Card>
    )
}