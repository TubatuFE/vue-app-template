class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

let user = new Student("Jane", "M.", "User")

function greeter(person : Person) {
  var person = person || new Student("Ken", "Bliky", "Li")
  return "Hello, " + person.firstName + " " + person.lastName;
}

export default greeter
