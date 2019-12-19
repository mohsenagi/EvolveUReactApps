class ListNode{
    constructor(subject, amount, next = null, prev = null){
        this.subject = subject
        this.amount = amount
        this.next = next
        this.prev = prev
    }

    show() {
        return `subject is "${this.subject}" and amount is "${this.amount}"`
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.current = null;
        this.tail = null;
    }

    
    insertAtBeginning (subject, amount) {
        let newNode = new ListNode(subject, amount);
        if (this.head !== null) {
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.current) this.current = newNode;
        if (!this.tail) this.tail = newNode;
        return;
    }
    
    insertAtEnd (subject, amount){
        let newNode = new ListNode(subject, amount);
        if (this.tail !== null) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.current) this.current = newNode;
        if (!this.head) this.head = newNode;
        return;
    }
    
    insertAfterCurrent (subject, amount) {
        let target = this.current;
        if (target === null) return;
        let newNode = new ListNode(subject, amount, target.next, target);
        if(target.next !== null) target.next.prev = newNode;
        target.next = newNode;
        return;
    }

    deleteCurrent() {
        let target = this.current;
        if (target === null) return;
        if (target.next && target.prev) {
            target.prev.next = target.next;
            target.next.prev = target.prev;
            this.current = target.next;
            return;
        }
        if (target.next && !target.prev) {
            target.next.prev = null;
            this.head = target.next
            this.current = target.next;
            return;
        }
        if (!target.next && target.prev) {
            target.prev.next = null;
            this.tail = target.prev;
            this.current = target.prev;
            return;
        }
        if (!target.next && !target.prev) {
            this.head = null;
            this.current = null;
            this.tail = null;
            return;
        }
    }

    show() {
        let show = ``;
        let text = ``;
        let total = 0;
        let tail = this.head;
        if (tail === null) return null;
        while(tail !== null){
            if (tail === this.current) {
                text = `[${tail.subject}: ${tail.amount}] `
            } else {
                text = `${tail.subject}: ${tail.amount} `
            }
            total = total + Number(tail.amount);
            show = show + text;
            tail = tail.next;
        }
        return `${show}\n \n total amount: ${total}`;
    }
}

export {ListNode, LinkedList}