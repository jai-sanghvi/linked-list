import Node from "./node.js";

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
    if (index === this.#size - 1) return this.#tail;

    let currentNode = this.#head;

    if (index > 0 && index < this.#size) {
      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.nextNode;
      }
    }

    return currentNode;
  }

  pop() {
    // For lists of size greater than 1
    // [0, 1, 2, 3]
    // size of this list is 4
    // element at (size - 2)th index is 2
    // change the nextNode property of that element to null
    // assign #tail property to that element
    // decrease #size by 1

    if (this.#size === 0) throw new Error("List is empty");

    const oldTail = this.#tail;

    if (this.#size === 1) {
      this.#head = this.#tail = undefined;
    } else {
      const newTail = this.at(this.#size - 2);
      newTail.nextNode = null;
      this.#tail = newTail;
    }

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
    let string = "";

    let currentNode = this.#head;

    for (let i = 0; i < this.#size; i++) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    string += "null";

    return string;
  }

  insertAt(index, value) {
    // [0, 1, 3, 4]
    // size is 4
    // insertAt(2, 2) should insert the value "2" at index 2
    // Loop through the list and save elements at (index) and (index - 1)
    // create new node with "value" and nextNode to (index)
    // go to (index - 1) index and change its nextNode to the new node
    // increase size by 1

    if (index === 0) {
      this.prepend(value);
      return this.#size;
    } else if (index === this.#size) {
      this.append(value);
      return this.#size;
    } else if (index < 0 || index > this.#size) {
      throw new Error("Trying to access index out of bounds");
    } else {
      let currentNode = this.#head;
      let nodeBeforeTarget;
      let nodeAtTarget;

      for (let i = 0; i <= index; i++) {
        if (i === index - 1) {
          nodeBeforeTarget = currentNode;
        } else if (i === index) {
          nodeAtTarget = currentNode;
        }

        currentNode = currentNode.nextNode;
      }

      let nodeToInsert = new Node(value, nodeAtTarget);
      nodeBeforeTarget.nextNode = nodeToInsert;

      return ++this.#size;
    }
  }

  removeAt(index) {
    // [0, 1, 2, 3, 4]
    // find element at(index - 1) and store it in a variable
    // find element at(index + 1) and store it in a variable
    // change nextNode property of element at (index - 1) to element at (index + 1)
    // decrease size by 1

    if (index < 0 || index >= this.#size)  {
      throw new Error("Trying to access index out of bounds");
    } else if (this.#size === 0) {
      throw new Error("List is empty");
    } else if ( index === (this.#size - 1) ) {
      this.pop();
    } else if ( index === 0 ) {
      this.#head = this.at(1);
      this.#size--;
    } else {
      const nodeBeforeTarget = this.at(index - 1);
      const nodeAfterTarget = this.at(index + 1);

      nodeBeforeTarget.nextNode = nodeAfterTarget;
      this.#size--;
    }

    return this.#size;
  }
}
