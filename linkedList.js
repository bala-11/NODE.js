class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
    }
    add(element){
        let newNode = new Node(element)

        if(this.head == null){
            this.head = newNode
        }
        else{
            let link = this.head
            while(link.next!=null){
                link = link.next
            }
            link.next = newNode
        }
    }
    print(){
        let current = this.head
        while(current != null){
            console.log(current.data);
            current = current.next
        }
    }
}

let thread = new LinkedList()

thread.add(1)
thread.add(3)
thread.add(5)

thread.print()