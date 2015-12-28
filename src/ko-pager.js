"use strict"

/*******************
 * ko-pager.js 0.0.1
 *******************/
 
var koPager = koPager || {};
koPager.pagerDefaults = koPager.pagerDefaults || {
	debug: false,
    selection: false,
    increments: [10, 25, 50, 100],
    refresh: function(data, criteria){
		var data = $.extend([],data);
		var sortField = criteria.sort;
		var sortDown = criteria.sortDown;
		if(sortField){
			data = data.sort(function(a,b){
				var value = a[sortField] > b[sortField] ? 1 : a[sortField] < b[sortField] ? -1 : 0;
				if(sortDown){
					value *= -1;
				}
				return value;
			});
		}
		var pageSize = criteria.pageSize || 0;
		var offset = criteria.offset || 0;
		if(offset || pageSize){
			data = data.splice(offset,pageSize);
		}
		console.log(criteria);
		return data;
	},
    transform: function (data) {
        return data;
    },
    endpoint: null,
    method: null,
    filters: {},
    sortUpIcon: "glyphicon glyphicon-chevron-up",
    sortDownIcon: "glyphicon glyphicon-chevron-down",
    sortNoneIcon: "glyphicon glyphicon-minus",
	pageSizeClass: "form-control",
    class: 'table table-striped',
	nextClass: 'btn btn-default',
	prevClass: 'btn btn-default',
	pageTemplate: 'ko-pager-default-page-template',
	sizeTemplate: 'ko-pager-default-size-template',
	buttonTemplate: 'ko-pager-default-button-template',
	nextTemplate: 'ko-pager-default-next-template',
	prevTemplate: 'ko-pager-default-prev-template'
};
koPager.fieldDefaults = koPager.fieldDefaults || {
    field: null,
    title: null,
    sortable: true,
    headerTemplate: 'ko-pager-default-header-template',
    headerClass: null,
    contentTemplate: 'ko-pager-default-content-template',
    contentClass: null
};

ko.components.register('ko-pager', {
    viewModel: function (params) {
        var self = this;
		
        self.options = $.extend({}, koPager.pagerDefaults, params);
        self.options.fields = (self.options.fields || []).map(function (item) {
            return $.extend({}, koPager.fieldDefaults, item);
        });
		
        self.data = ko.observableArray(ko.utils.unwrapObservable(self.options.data || []));
		self.processedData = ko.observableArray([]);
		self.shownData = ko.pureComputed({
			read: function(){
				return self.processedData().map(self.options.transform);
			},
			write: function(value){
				self.processedData(value);
			}
		});
		self.dataSize = ko.observable(self.data().length);
		
		self.sort = ko.observable(self.options.fields[0].field);
		self.sortDown = ko.observable(false);
		self.setSort = function(field){
			if(field.sortable){
				if(self.sort() === field.field){
					self.sortDown(!self.sortDown());
				}else{
					self.sort(field.field);
				}
			}
		};
		
		self.pageSize = ko.observable(self.options.increments[0]);
		self.offset = ko.observable(0);
		self.next = function(){
			if(self.canNext()){
				self.movePages(1);
			}
		};
		self.prev = function(){
			if(self.canPrev()){
				self.movePages(-1);
			}
		};
		self.movePages = function(value){
			var offset = self.offset() + (self.pageSize() * value);
			offset = Math.min(self.dataSize() - 1, offset);
			offset = Math.max(0,offset);
			self.offset(offset);
		};
		self.minIndex = ko.pureComputed(function(){
			return self.dataSize() ? (self.offset() + 1) : 0;
		});
		self.maxIndex = ko.pureComputed(function(){
			return Math.min(self.dataSize(), self.offset() + self.pageSize());
		});
		
		self.canPrev = ko.pureComputed(function(){
			return self.minIndex() > 1;
		});
		self.canNext = ko.pureComputed(function(){
			return self.maxIndex() < self.dataSize();
		});
		
		self.searchCriteria = ko.computed(function(){
			var options = {};
			options.sort = ko.utils.unwrapObservable(self.sort);
			options.sortDown = ko.utils.unwrapObservable(self.sortDown);
			options.pageSize = ko.utils.unwrapObservable(self.pageSize);
			options.offset = ko.utils.unwrapObservable(self.offset);
			return options;
		});
		if(self.options.refresh){
			self.searchCriteria.subscribe(function(oldValue){
				var data = self.options.refresh(self.data(), self.searchCriteria());
				self.shownData(data);
			});
			self.searchCriteria.notifySubscribers();
		}
    },
    template: '<span data-bind="if: options.debug">' +
		'Sort: <span data-bind="text: sort"></span>' +
		' - Down: <span data-bind="text: sortDown"></span>' +
		' - Offset: <span data-bind="text: offset"></span>' +
		' - Page Size: <span data-bind="text: pageSize"></span>' +
		'</span>' +
		'<div data-bind="template: options.sizeTemplate"></div>' +
		'<div class="row">' +
		'<div data-bind="template: options.pageTemplate"></div>' +
		'<div data-bind="template: options.buttonTemplate"></div>' +
		'</div>' +
		'<div class="table-responsive">' +
        '<table class="table table-striped">' +
        '<thead>' +
        '<tr data-bind="foreach: options.fields">' +
        '<th data-bind="template: { name: headerTemplate, data: { pager: $parent, field: $data } }, attr: { class: headerClass }">' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody data-bind="foreach: shownData">' +
        '<tr data-bind="foreach: $parent.options.fields">' +
        '<td data-bind="template: { name: contentTemplate, data: { pager: $parent, data: $parent, field: $data } }, attr: { class: contentClass, with: $parent }">' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
		'<div class="row">' +
		'<div data-bind="template: options.pageTemplate"></div>' +
		'<div data-bind="template: options.buttonTemplate"></div>' +
		'</div>'
});

$("body").append(
    '<script type="text/html" id="ko-pager-default-header-template">' +
	'<span data-bind="click: function() { pager.setSort(field); }">' +
    '<span data-bind="if: field.sortable">' +
	'<span data-bind="attr: { class: pager.sort() === field.field ? pager.sortDown() ? pager.options.sortDownIcon : pager.options.sortUpIcon : pager.options.sortNoneIcon }"></span>' +
	'</span>' +
	'<span data-bind="text: field.title"></span>' +
	'</span>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-content-template">' +
	'<span data-bind="text: data[field.field]"></span>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-page-template">' +
	'<div class="pull-left">' +
	'<label>Showing <span data-bind="text: minIndex"></span> - <span data-bind="text: maxIndex"></span> of <span data-bind="text: dataSize"></span>' +
    '</div>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-button-template">' +
	'<div class="row">' +
	'<div class="pull-right btn-group">' +
	'<span data-bind="template: options.prevTemplate"></span>' +
	'<span data-bind="template: options.nextTemplate"></span>' +
	'</div>' +
	'</div>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-size-template">' +
	'<div class="row"><div class="pull-right">' +
	'<label>Results per Page:</label> <select data-bind="options: options.increments, value: pageSize, attr: { class: options.pageSizeClass }" ></select>' +
	'</div></div>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-next-template">' +
	'<a data-bind="enable: canNext, click: next, attr: { class: options.nextClass }">Next</a>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-prev-template">' +
	'<a data-bind="enable: canPrev, click: prev, attr: { class: options.prevClass }">Previous</a>' +
    '</script>'
);