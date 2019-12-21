import {ListNode, LinkedList} from './LinkedList.js';

test (`LinkedList`, () => {
    let list = new LinkedList;

    // test when the list is empty
    list.deleteCurrent();
    expect(list.head).toEqual(null);
    expect(list.current).toEqual(null);
    expect(list.tail).toEqual(null);

    // test adding at the begining
    list.insertAtBeginning(`b`, 2);
    expect(list.head.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.show()).toEqual(`subject is "b" and amount is "2"`);

    // test deleting the only item in the list
    list.deleteCurrent();
    expect(list.head).toEqual(null);
    expect(list.current).toEqual(null);
    expect(list.tail).toEqual(null);
    list.insertAtBeginning(`b`, 2);

    // test adding the second item at begining
    list.insertAtBeginning("a", 1);
    expect(list.head.show()).toEqual(`subject is "a" and amount is "1"`);
    expect(list.tail.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.head.next.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.prev.show()).toEqual(`subject is "a" and amount is "1"`);
    
    // test adding to the end
    list.insertAtEnd(`d`, 4);
    expect(list.tail.show()).toEqual(`subject is "d" and amount is "4"`);
    expect(list.tail.prev.show()).toEqual(`subject is "b" and amount is "2"`);
    expect(list.tail.next).toEqual(null);

    // test adding second item to the end
    list.insertAtEnd(`z`, 28);
    expect(list.tail.show()).toEqual(`subject is "z" and amount is "28"`);
    expect(list.tail.prev.show()).toEqual(`subject is "d" and amount is "4"`);
    expect(list.tail.next).toEqual(null);

    // test insert after current item
    list.insertAfterCurrent(`c`, 3);
    expect(list.current.next.show()).toEqual(`subject is "c" and amount is "3"`);
    expect(list.current.next.next.show()).toEqual(`subject is "d" and amount is "4"`);
    expect(list.current.next.prev.show()).toEqual(`subject is "b" and amount is "2"`);

    // test moving around the list
    list.prev();
    expect(list.current.show()).toEqual(`subject is "a" and amount is "1"`)
    list.next();
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`);
    list.last();
    expect(list.current.show()).toEqual(`subject is "z" and amount is "28"`);
    list.first();
    expect(list.current.show()).toEqual(`subject is "a" and amount is "1"`);
    
    // test delete the first item
    list.deleteCurrent();
    expect(list.current.show()).toEqual(`subject is "b" and amount is "2"`)
    expect(list.current.prev).toEqual(null)
    expect(list.current.next.show()).toEqual(`subject is "c" and amount is "3"`)
    list.insertAtBeginning(`a`, 1);

    // test delete the last item
    list.last();
    expect(list.current.show()).toEqual(`subject is "z" and amount is "28"`);
    list.deleteCurrent();
    expect(list.current.show()).toEqual(`subject is "d" and amount is "4"`);
    expect(list.current.next).toEqual(null)
    expect(list.current.prev.show()).toEqual(`subject is "c" and amount is "3"`)
    list.insertAtEnd(`z`, 28);

    // test delete an item in the middle of the list
    list.prev();
    expect(list.current.show()).toEqual(`subject is "c" and amount is "3"`);
    list.deleteCurrent();
    expect(list.current.show()).toEqual(`subject is "d" and amount is "4"`);
    expect(list.current.prev.show()).toEqual(`subject is "b" and amount is "2"`)
})