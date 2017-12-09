export class BookingModel{
    userId: number;
    eventId: number;
    transactionStatus: string;
    constructor(userId: number,  eventId: number, transactionStatus: string) {
        this.userId = userId;
        this.eventId = eventId;
        this.transactionStatus = transactionStatus;
    }
}
