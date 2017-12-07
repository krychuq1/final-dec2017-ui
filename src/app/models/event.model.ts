export class EventModel{
    title: string;
    address: string;
    city: string;
    online_event: boolean;
    start_date: string;
    end_date: string;
    image: string;
    description: string;
    organizer_name: string;
    number_of_places: number;
    constructor(title: string, address: string, city: string, online_event: boolean, start_date: string,
    end_date: string, image: string, description: string, organizer_name: string, number_of_places: number) {
        this.title = title;
        this.address = address;
        this.city = city;
        this.online_event = online_event;
        this.start_date = start_date;
        this.end_date = end_date;
        this.image = image;
        this.description = description;
        this.organizer_name = organizer_name;
        this.number_of_places = number_of_places;
    }
}