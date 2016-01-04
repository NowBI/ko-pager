﻿"use strict"

var EndpointSampleViewModel = function () {
    var self = this;
    self.sampleFields = [
    {
        field: "id",
        title: "Id"
    }, {
        field: "name",
        title: "Name"
    }, {
        field: "username",
        title: "Username",
    }, {
        field: "email",
        title: "Email",
		contentTemplate: 'email-content-template'
    }, {
        field: "website",
        title: "Website",
		contentTemplate: 'website-content-template'
    }];
};

ko.applyBindings(new EndpointSampleViewModel());