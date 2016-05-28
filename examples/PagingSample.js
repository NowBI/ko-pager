"use strict"

var PagingSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray(nbi.sampleData);
    self.sampleData.extend({ paging: {} });

    self.currentId = ko.observable(self.sampleData().length);

    self.add = function () {
        self.currentId(self.currentId() + 1);
        var newItem = {
            "id": self.currentId(),
            "firstName": "Leticia",
            "lastName": "Zamora",
            "age": parseInt((Math.random() * 75) + 15),
            "gender": Math.random() > 0.5 ? "male" : "female",
            "company": "RODEOLOGY"
        };
        self.sampleData.push(newItem);
    };

    self.remove = function (value) {
        self.sampleData.remove(value);
    };
};

ko.applyBindings(new PagingSampleViewModel());