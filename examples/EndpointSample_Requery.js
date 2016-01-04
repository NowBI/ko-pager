"use strict"

var EndpointSampleSimpleViewModel = function () {
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
	self.sampleFilters = {
		id: ko.observable(1)
	};
	self.endpointParameters = {
		url: 'http://jsonplaceholder.typicode.com/users',
		filtersInline: true,
		requery: true,
		filtersInline: true,
		sortIncluded: true,
		sortDownIncluded: true,
		pageSizeIncluded: true,
		offsetIncluded: true,
		filtersIncluded: true
	};
};

ko.applyBindings(new EndpointSampleSimpleViewModel());