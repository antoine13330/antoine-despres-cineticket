import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import moment from 'moment'
import { Ticket } from '../types/ticket.type'

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
const sortTickets = (tickets: Ticket[]): Ticket[] => {
    return tickets
        .filter(ticket => moment(ticket.expirationDate).isValid()) 
        .sort((a, b) => moment(a.expirationDate).diff(moment(b.expirationDate)))
}

const useTicketStore = create(
    persist<State & Actions>(
        (set) => ({
            tickets: [],
            initTickets: (tickets) => set({ tickets: sortTickets(tickets) }),
            bulkAddTickets: (tickets) => set((state) => ({ tickets: sortTickets([...state.tickets, ...tickets]) })),
            addTicket: (ticket) => set((state) => ({ tickets: sortTickets([...state.tickets, ticket]) })),
            updateTicket: (ticket) => set((state) => ({
                tickets: sortTickets(state.tickets.map(t => t.id === ticket.id ? ticket : t))
            })),
            removeTicket: (ticket) => set((state) => ({
                tickets: sortTickets(state.tickets.filter(t => t.id !== ticket.id))
            })),
            bulkRemoveTickets: (tickets) => set((state) => ({
                tickets: sortTickets(state.tickets.filter(t => !tickets.some(removed => removed.id === t.id)))
            })),
            bulkUpdateTickets: (tickets) => set((state) => ({
                tickets: sortTickets(state.tickets.map(t => {
                    const updatedTicket = tickets.find(updatedTicket => updatedTicket.id === t.id)
                    return updatedTicket ? updatedTicket : t
                }))
            }))
        }),
        { name: 'ticket-store' }
    )
)

export default useTicketStore
