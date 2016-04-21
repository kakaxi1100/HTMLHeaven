//function Person(name) {
//    this._name = name;
//}
//Person.prototype.say = function()
//{
//    alert("I am person");
//}
//function Student(name) {
    
//}
//Student.prototype = new Person();
//var superSay = Student.prototype.say;

//Student.prototype.say = function () {
//    superSay.call(this);
//    alert("I am a student");
//}
////Student.prototype.say.apply(Person.prototype);
////Student.prototype.p_say();
//var s = new Student("哈哈");
//s.say();


//var person = {
//    name: "ares ",
//    age: 30,
//    eat: function () {
//        alert("美味77");
//    }
//}

//alert(person.name);

//function Person() {

//}

//Person.prototype = {
//    name: "ares",
//    age: 30,
//    eat: function () {
//        alert("美味77");
//    }
//}

//var p = new Person();
//p.eat();

function Person(name) {
    var _this = {};
    _this._name = name;
    _this.sayHello = function () {
        alert("hello"+_this._name);
    }
    return _this;
}

function Teacher(name) {
    var _this = Person(name);
    var superSay = _this.sayHello;
    _this.sayHello = function () {
        superSay.call(_this);
        alert("Teacher"+_this._name);
    }
    return _this;
}

var t = Teacher("haha");
t.sayHello();
