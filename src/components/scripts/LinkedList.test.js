import {ListNode, LinkedList} from './LinkedList.js';

test (`LinkedList`, () => {
    let list = new LinkedList;
    expect(list.insertAfterIndex(0, `haha`, 100)).toEqual(`index not found`);
    expect(list.findAndShow(0)).toEqual(`index not found`);
    list.insertAtBeginning(`b`, 2);
    expect(list.findAndShow(0)).toEqual(`subject is "b" and amount is "2"`);
    list.insertAtBeginning("a", 1);
    expect(list.findAndShow(0)).toEqual(`subject is "a" and amount is "1"`);
    expect(list.findAndShow(1)).toEqual(`subject is "b" and amount is "2"`);
    list.insertAtEnd(`c`, 3);
    expect(list.findAndShow(2)).toEqual(`subject is "c" and amount is "3"`);
    list.insertAtEnd(`z`, 28);
    expect(list.findAndShow(2)).toEqual(`subject is "c" and amount is "3"`);
    expect(list.findAndShow(3)).toEqual(`subject is "z" and amount is "28"`);
    list.insertAfterIndex(2, `d`, 4);
    expect(list.findAndShow(2)).toEqual(`subject is "c" and amount is "3"`);
    expect(list.findAndShow(3)).toEqual(`subject is "d" and amount is "4"`);
    expect(list.insertAfterIndex(5, `haha`, 100)).toEqual(`index not found`);
    list.insertAfterIndex(4, `aa`, 29);
    expect(list.findAndShow(5)).toEqual(`subject is "aa" and amount is "29"`);
    expect(list.findAndShow(6)).toEqual(`index not found`);
    list.delete(5);
    expect(list.findAndShow(5)).toEqual(`index not found`);
    expect(list.find(4).next).toEqual(null);
    list.delete(1);
    expect(list.findAndShow(1)).toEqual(`subject is "c" and amount is "3"`);
    list.insertAfterIndex(0, `b`, 2);
    expect(list.findAndShow(1)).toEqual(`subject is "b" and amount is "2"`);
    expect(list.findAndShow(3)).toEqual(`subject is "d" and amount is "4"`);
    let itm = list.find(3);
    expect(list.findIndex(itm)).toEqual(3);
    itm.deleteFrom(list);
    expect(list.findAndShow(3)).toEqual(`subject is "z" and amount is "28"`);
    itm = list.find(2);
    itm.insertAfter(list, `d`, 4);
    expect(list.findAndShow(3)).toEqual(`subject is "d" and amount is "4"`);
})