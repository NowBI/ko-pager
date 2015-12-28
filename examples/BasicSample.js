"use strict"

var BasicSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray([
        {
            firstName: "Maria",
            lastName: "Susanna",
            age: 23,
            occupation: "Substitute Teacher",
            gender: "Female"
        }, {
            firstName: "Richard",
            lastName: "Mailoux",
            age: 43,
            occupation: "Postal Worker",
            gender: "Male"
        }, {
            firstName: "Xavier",
            lastName: "Zillard",
            age: 34,
            occupation: "Lizard Man",
            gender: "Male"
        }
    ]);
    self.sampleFields = [
    {
        field: "firstName",
        title: "First Name"
    }, {
        field: "lastName",
        title: "Last Name"
    }, {
        field: "gender",
        title: "Sex",
        sortable: false
    }, {
        field: "age",
        title: "Age"
    }, {
        field: "occupation",
        title: "Occupation"
    }];
};

ko.applyBindings(new BasicSampleViewModel());