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

    deleteFrom(list) {
        let myIndex = list.findIndex(this);
        list.delete(myIndex);
    }

    insertAfter(list, subject, amount) {
        let myIndex = list.findIndex(this);
        list.insertAfterIndex(myIndex, subject, amount);
    }
    
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    tail() {
        if (!this.head) return;
        let tail = this.head;
        while(tail.next !== null){
            tail = tail.next;
        }
        return tail;
    }
    
    insertAtBeginning (subject, amount) {
        let newNode = new ListNode(subject, amount);
        if (this.head !== null) {
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.head = newNode;
        return;
    }
    
    insertAtEnd (subject, amount){
        let newNode = new ListNode(subject, amount);
        if(!this.head){
            this.head = newNode;
            return;
        }
        let tail = this.head;
        while(tail.next !== null){
            tail = tail.next;
        }
        tail.next = newNode;
        newNode.prev = tail;
        return;
    }
    
    insertAfterIndex (index, subject, amount) {
        let target = this.find(index);
        if (target === "index not found") return "index not found";
        let newNode = new ListNode(subject, amount, target.next, target);
        if(target.next !== null) target.next.prev = newNode;
        target.next = newNode;
        return;
    }
    
    find(index) {
        let target = this.head;
        for (let counter = 0; counter < index; counter++) {
            if(target.next === null) return "index not found"
            target = target.next
        }
        if (target === null) return "index not found"
        return target;
    }

    findIndex(itm) {
        let tail = this.head;
        if (tail === null) return null;
        let counter = 0;
        while(tail !== null){
            if (tail === itm) return counter;
            tail = tail.next;
            counter = counter+1;
        }
        return counter;
    }
    
    findAndShow(index) {
        let target = this.find(index);
        if (target === "index not found") return "index not found";
        return target.show();
    }

    delete(index) {
        let target = this.find(index);
        if (target === "index not found") return "index not found";
        if (target.next && target.prev) {
            target.prev.next = target.next;
            target.next.prev = target.prev;
            return;
        }
        if (target.next && !target.prev) {
            target.next.prev = null;
            this.head = target.next
            return;
        }
        if (!target.next && target.prev) {
            target.prev.next = null;
            return;
        }
        if (!target.next && !target.prev) {
            this.head = null;
            return;
        }
    }

    show() {
        let show = [];
        let tail = this.head;
        if (tail === null) return null;
        while(tail !== null){
            show.push([tail.subject, ': ', tail.amount], ', ');
            tail = tail.next;
        }
        return show;
    }
}

export {ListNode, LinkedList}