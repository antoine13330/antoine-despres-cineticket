import Dexie, { Table } from "dexie";
import { Ticket } from "../types/ticket.type";


export class FlickyDB extends Dexie {
    tickets!: Table<Ticket, number>;

    constructor() {
        super("FlickyDB");
        this.version(1).stores({
            tickets: "++id, expirationDate, status, base64Image",
        });
    }
}

export const db = new FlickyDB();
db.version(1).stores({
    tickets: "++id, expirationDate, status, base64Image"
    });


