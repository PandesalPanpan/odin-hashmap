import LinkedList from "./linkedlist.js";

const list = new LinkedList();

list.append("akey","dog");
list.append("tac", "cat");
list.append("torrat","parrot");
list.append("tesrter","hamster");
list.append("ekane", "snake");
list.append("eltes", "turtle");
console.log(list.toString());
console.log(`Expected result:`)
console.log(`( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null`);