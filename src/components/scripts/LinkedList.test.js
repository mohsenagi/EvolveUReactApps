import {ListNode, LinkedList} from './LinkedList.js';

test (`LinkedList`, () => {
    let list = new LinkedList;
    list.insertAtBeginning(`b`, 2);
    expect(list.head.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.show()).toEqual(`subject is "b" and amount is "2"`);
    list.insertAtBeginning("a", 1);
    expect(list.head.show()).toEqual(`subject is "a" and amount is "1"`);
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.head.next.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.prev.show()).toEqual(`subject is "a" and amount is "1"`);
    list.insertAtEnd(`d`, 4);
    expect(list.tail.show()).toEqual(`subject is "d" and amount is "4"`);
    list.insertAtEnd(`z`, 28);
    expect(list.tail.show()).toEqual(`subject is "z" and amount is "28"`);
    expect(list.tail.prev.show()).toEqual(`subject is "d" and amount is "4"`);
    list.insertAfterCurrent(`c`, 3);
    expect(list.current.next.show()).toEqual(`subject is "c" and amount is "3"`);
    list.deleteCurrent();
    expect(list.current.show()).toEqual(`subject is "c" and amount is "3"`)
    expect(list.current.prev.show()).toEqual(`subject is "a" and amount is "1"`)
    expect(list.current.next.show()).toEqual(`subject is "d" and amount is "4"`)
    list.current = list.current.prev;
    list.insertAfterCurrent(`b`, 2);
    expect(list.head.show()).toEqual(`subject is "a" and amount is "1"`);
    expect(list.current.show()).toEqual(`subject is "a" and amount is "1"`);
    expect(list.tail.show()).toEqual(`subject is "z" and amount is "28"`);
    list.deleteCurrent();
    expect(list.head.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.current.next.show()).toEqual(`subject is "c" and amount is "3"`);
    list.insertAtBeginning("a", 1);
    list.current = list.tail;
    list.deleteCurrent();
    expect(list.tail.show()).toEqual(`subject is "d" and amount is "4"`);
})