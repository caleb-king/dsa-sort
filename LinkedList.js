class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

// implement LinkedList class

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(itemToInsert, itemToMatch) {
    if (this.head === null) {
      return null;
    }
    // if matching node is head
    if (this.head.value === itemToMatch) {
      this.insertFirst(itemToMatch);
    }
    let currNode = this.head;
    let prevNode = this.head;
    while (currNode !== null && currNode.value !== itemToMatch) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return null;
    }
    prevNode.next = new _Node(itemToInsert, currNode);
  }

  insertAfter(itemToInsert, itemToMatch) {
    if (this.head === null) {
      return null;
    }
    let currNode = this.head;
    while (currNode !== null && currNode.value !== itemToMatch) {
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return null;
    }
    currNode.next = new _Node(itemToInsert, currNode.next);
  }

  insertAt(item, index) {
    if (this.head === null) {
      return null;
    }
    if (index === 0) {
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    let currPosition = 0;
    while (currNode !== null && currPosition !== index) {
      prevNode = currNode;
      currNode = currNode.next;
      currPosition += 1;
    }
    if (currNode === null) {
      console.log('Position beyond length of list');
      return null;
    }
    prevNode.next = new _Node(item, currNode);
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    // if node to remove is head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;
    while (currNode.value !== item && currNode !== null) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    // if node is not found
    if (currNode === null) {
      console.log('Item not found');
      return null;
    }
    prevNode.next = currNode.next;
  }

  find(item) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      currNode = currNode.next;
    }
    return currNode;
  }
}

export default LinkedList;
