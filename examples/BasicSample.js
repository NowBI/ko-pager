"use strict"

var BasicSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray(nbi.sampleData);
    self.sampleData.extend({ pagination: {} });

    self.remove = function (value) {
        self.sampleData.remove(value);
    };
};

ko.applyBindings(new BasicSampleViewModel());