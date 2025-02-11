import Dexie from "dexie";

export const db = new Dexie("FlickyDB") as any;
db.version(1).stores({
    tickets: "++id, expirationDate, status, base64Image"
    });


