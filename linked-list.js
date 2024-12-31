import Node from './node.js';

export default class LinkedList {
  #head;
  #tail;
  #size = 0;

  append(value) {
    let nodeToBeAppended = new Node(value);

    if (this.#head === undefined) {
      this.#head = nodeToBeAppended;
    } else {
      this.#tail.nextNode = nodeToBeAppended;
    }

    this.#tail = nodeToBeAppended;
    this.#size++;
    return this;
  }

  prepend(value) {
    if (this.#head === undefined) {
      this.#head = new Node(value);
    } else {
      this.#head = new Node(value, this.#head);
    }

    this.#size++;
    return this;
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  at(index) {
    if (index === 0) return this.#head;
    if ( index === (this.#size - 1) ) return this.#tail;

    if ( (index > 0) && (index < this.#size) ) {
      let currentNode = this.#head;

      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.nextNode;
      }
    }

    return currentNode;
  }

  pop() {
    // [0, 1, 2, 3]
    // size of this list is 4
    // element at (size - 2)th index is 2
    // change the nextNode property of that element to null
    // assign #tail property to that element
    // decrease #size by 1

    const oldTail = this.#tail;
    const newTail = this.at( (this.#size - 2) );
    newTail.nextNode = null;
    this.#tail = newTail;
    this.#size--;

    return oldTail;
  }

  contains(value) {
    let currentNode = this.#head;

    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentNode = this.#head;

    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) return i;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  toString() {
    let string = '';
    
    let currentNode = this.#head;

    for (let i = 0; i < this.#size; i++) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    string += 'null';

    return string;
  }

}