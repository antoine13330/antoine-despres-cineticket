import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import moment from 'moment'
import { Ticket, TicketStatus } from '../types/ticket.type'

type State = {
    tickets: Ticket[]
}
type Actions = {
    initTickets: (tickets: Ticket[]) => void,
    bulkAddTickets: (tickets: Ticket[]) => void,
    addTicket: (ticket: Ticket) => void,
    updateTicket: (ticket: Ticket) => void,
    removeTicket: (ticket: Ticket) => void,
    bulkRemoveTickets: (tickets: Ticket[]) => void,
    bulkUpdateTickets: (tickets: Ticket[]) => void
}

// Fonction pour trier les tickets
const sortAndUpdateTickets = (tickets: Ticket[]): Ticket[] => {
    const sorted = tickets
        .filter(ticket => moment(ticket.expirationDate).isValid())
        .sort((a, b) => moment(a.expirationDate).diff(moment(b.expirationDate)))

    const updatedStatus = sorted.map(ticket => {
        if (moment(ticket.expirationDate).isBefore(moment()) && ticket.status !== TicketStatus.EXPIRED) {
            return { ...ticket, status: TicketStatus.EXPIRED }
        }
        return ticket
    }
    )
    // return with ticket valid in first and expired in last
    return updatedStatus.sort((a, b) => {
        if (a.status === TicketStatus.VALID && b.status !== TicketStatus.VALID) return -1
        if (a.status !== TicketStatus.VALID && b.status === TicketStatus.VALID) return 1
        return 0

    })
}

const useTicketStore = create(
    persist<State & Actions>(
        (set) => ({
            tickets: [],
            initTickets: (tickets) => set({ tickets: sortAndUpdateTickets(tickets) }),
            bulkAddTickets: (tickets) => set((state) => ({ tickets: sortAndUpdateTickets([...state.tickets, ...tickets]) })),
            addTicket: (ticket) => set((state) => ({ tickets: sortAndUpdateTickets([...state.tickets, ticket]) })),
            updateTicket: (ticket) => set((state) => ({
                tickets: sortAndUpdateTickets(state.tickets.map(t => t.id === ticket.id ? ticket : t))
            })),
            removeTicket: (ticket) => set((state) => ({
                tickets: sortAndUpdateTickets(state.tickets.filter(t => t.id !== ticket.id))
            })),
            bulkRemoveTickets: (tickets) => set((state) => ({
                tickets: sortAndUpdateTickets(state.tickets.filter(t => !tickets.some(removed => removed.id === t.id)))
            })),
            bulkUpdateTickets: (tickets) => set((state) => ({
                tickets: sortAndUpdateTickets(state.tickets.map(t => {
                    const updatedTicket = tickets.find(updatedTicket => updatedTicket.id === t.id)
                    return updatedTicket ? updatedTicket : t
                }))
            }))
        }),
        { name: 'ticket-store' }
    )
)

export default useTicketStore
