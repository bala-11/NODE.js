const person = {
    firstName : "Balaji",
    lastName : "Kalimuthu",
    display: function() {
        return this.firstName +" "+ this.lastName;
    }
}


let dis = person.display.bind(person)
setTimeout(dis,3000)