"use strict"

var BasicSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray(nbi.sampleData);
    self.sampleData.extend({ pagination: {} });
};

ko.applyBindings(new BasicSampleViewModel());