export enum TicketStatus {
    EXPIRED = 'expired',
    CONSUMED = 'consumed',
    VALID = 'valid'
}
export type Ticket = {
    id : string,
    expirationDate : string,
    status : TicketStatus,
    base64Image : string,    
}