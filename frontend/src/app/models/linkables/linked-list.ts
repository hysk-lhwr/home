import { Node } from "./node";

export class LinkedList {
    head: Node = null;
    len: number = 0;

    public append(node: Node) {
        if (this.head == null) {
            this.head = node;
        } else {
            let current: Node = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
            node.previous = current;
        }
        this.len++;
    }

    public getNodeByValue(val: string): Node {

        if (this.head == null ) {
            return null;
        }

        if (this.head.value == val) {
            return this.head;
        }

        let current = this.head;
        while(current.next) {
            current = current.next;
            if (current.value == val) {
                return current;
            }
        }

        return null;
    }
}