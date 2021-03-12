import { Status } from "../status";

export class Node {
    value: string;
    status: Status;
    title: string;
    next: Node;
    previous: Node;

    constructor(val: string, status: Status, title: string) {
        this.value = val;
        this.next = null;
        this.previous = null;
        this.status = status;
        this.title = title;
    }
}