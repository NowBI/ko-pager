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
		return data;
	},
    transform: function (data) {
        return data;
    },
    filters: {},
	defaultSort: null,
	defaultSortDown: false
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
koPager.templateDefaults = koPager.templateDefaults || {
	pageTemplate: 'ko-pager-default-page-template',
	sizeTemplate: 'ko-pager-default-size-template',
	buttonTemplate: 'ko-pager-default-button-template',
	nextTemplate: 'ko-pager-default-next-template',
	prevTemplate: 'ko-pager-default-prev-template'
};
koPager.classDefaults = koPager.classDefaults || {
	pageSizeClass: "form-control",
    tableClass: 'table table-striped',
	nextClass: 'btn btn-default',
	prevClass: 'btn btn-default'
};
koPager.iconDefaults = koPager.iconDefaults || {
	nextIcon: 'glyphicon glyphicon-chevron-right',
	prevIcon: 'glyphicon glyphicon-chevron-left',
    sortUpIcon: "glyphicon glyphicon-chevron-up",
    sortDownIcon: "glyphicon glyphicon-chevron-down",
    sortNoneIcon: "glyphicon glyphicon-minus"
};
koPager.endpointDefaults = koPager.endpointDefaults || {
	url: null,
    method: "GET",
	dataType: "JSON",
	serverSideProcessing: false,
	sortParameter: 'sort',
	sortIncluded: true,
	sortDownParameter: 'sortDown',
	sortDownIncluded: true,
	pageSizeParameter: 'pageSize',
	pageSizeIncluded: true,
	offsetParameter: 'offset',
	offsetIncluded: true,
	filtersParameter: 'filters',
	filtersIncluded: true,
	filtersInline: false
};

ko.components.register('ko-pager', {
    viewModel: function (params) {
        var self = this;
		
		self.loading = ko.observable(true);
        self.options = $.extend({}, koPager.pagerDefaults, params);
        self.options.fields = (self.options.fields || []).map(function (item) {
            return $.extend({}, koPager.fieldDefaults, item);
        });
		self.fieldCount = ko.pureComputed(function(){
			return self.options.fields.length;
		});
		self.firstQueryDone = ko.observable(false);
		self.options.endpoint = $.extend({},koPager.endpointDefaults, self.options.endpoint);
		self.options.icons = $.extend({},koPager.iconDefaults, self.options.icons);
		self.options.classes = $.extend({},koPager.classDefaults, self.options.classes);
		self.options.templates = $.extend({},koPager.templateDefaults, self.options.templates);
		
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
		self.dataSize = ko.pureComputed(function(){
			return self.data().length;
		});
		self.showPageArea = ko.pureComputed(function(){
			return self.options.endpoint.url ? self.firstQueryDone() : true;
		});
		self.showMaximum = ko.pureComputed(function(){
			return !self.options.endpoint.url;
		});
		self.filters = ko.utils.unwrapObservable(self.options.filters || {});
		
		self.sort = ko.observable(self.options.defaultSort || self.options.fields[0].field);
		self.sortDown = ko.observable(self.options.defaultSortDown);
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
			offset = self.options.endpoint.serverSideProcessing ? offset : Math.min(self.dataSize() - 1, offset);
			offset = Math.max(0,offset);
			self.offset(offset);
		};
		self.minIndex = ko.pureComputed(function(){
			return self.dataSize() != null ? (self.offset() + 1) : 0;
		});
		self.maxIndex = ko.pureComputed(function(){
			var lastIndex = self.offset() + self.pageSize();
			return self.dataSize() != null ? Math.min(self.dataSize(), lastIndex) : lastIndex;
		});
		
		self.canPrev = ko.pureComputed(function(){
			return self.minIndex() > 1;
		});
		self.canNext = ko.pureComputed(function(){
			return self.options.endpoint.serverSideProcessing || self.maxIndex() < self.dataSize();
		});
		
		self.searchCriteria = ko.computed(function(){
			var options = {};
			options.sort = ko.utils.unwrapObservable(self.sort);
			options.sortDown = ko.utils.unwrapObservable(self.sortDown);
			options.pageSize = ko.utils.unwrapObservable(self.pageSize);
			options.offset = ko.utils.unwrapObservable(self.offset);
			options.filters = {};
			for (var key in self.filters) {
				var value = ko.utils.unwrapObservable(self.filters[key]) || null;
				if (Array.isArray(value)) {
					value = value.join(",");
					if (value === "") {
						value = null;
					}
				}
				options.filters[key] = value;
			}
			return options;
		});
		var endpoint = self.options.endpoint;
		if(endpoint.url){
			self.endpointCriteria = ko.pureComputed(function(){
				var criteria = self.searchCriteria();
				var options = {};
				if(endpoint.sortIncluded && criteria.sort){
					options[endpoint.sortParameter] = criteria.sort;
				}
				if(endpoint.sortDownIncluded && criteria.sortDown){
					options[endpoint.sortDownParameter] = criteria.sortDown;
				}
				if(endpoint.pageSizeIncluded && criteria.pageSize){
					options[endpoint.pageSizeParameter] = criteria.pageSize;
				}
				if(endpoint.offsetIncluded && criteria.offset){
					options[endpoint.offsetParameter] = criteria.offset;
				}
				var filters = {};
					for(var key in criteria.filters){
						var value = criteria.filters[key];
						if(value){
							filters[key] = value;
						}
					}
				if(endpoint.filtersInline){
				}else{
					options[endpoint.filtersParameter] = filters;
				}
				return $.extend({},filters,options);
			});
		}
		self.processData = function(data, criteria){
			if(!self.options.endpoint.serverSideProcessing){
				data = self.options.refresh(data, criteria);
			}
			self.shownData(data);
			self.loading(false);
		};
		self.searchCriteria.subscribe(function(oldValue){
			self.loading(true);
			var criteria = self.searchCriteria();
			var endpoint = self.options.endpoint;
			if(endpoint.url && (endpoint.serverSideProcessing || !self.firstQueryDone())){
				$.ajax({
					url: endpoint.url,
					method: endpoint.method,
					data: self.endpointCriteria(),
					dataType: endpoint.dataType
				}).done(function(data){
					self.data(data);
					self.processData(data, criteria);
					self.firstQueryDone(true);
				}).fail(function(data){
					console.error("Error: " + data.status + " - " + data.statusText);
					self.processData([], criteria);
				});
			}else{
				self.processData(self.data(), criteria);
			}
		});
		self.searchCriteria.notifySubscribers();
		if(self.options.debug){
			self.debugInfo = ko.pureComputed(function(){
				return JSON.stringify(self.searchCriteria(),null,"\t");
			});
		}
    },
    template: '<span data-bind="if: options.debug">' +
		'<label>Debug Info:</label> <textarea data-bind="textInput: debugInfo" readonly class="form-control"></textarea>' +
		'<div data-bind="template: options.templates.sizeTemplate"></div>' +
		'<div class="row">' +
		'<div data-bind="template: options.templates.pageTemplate"></div>' +
		'<div data-bind="template: options.templates.buttonTemplate"></div>' +
		'</div>' +
		'<div class="table-responsive">' +
        '<table data-bind="attr: { class: options.classes.tableClass }">' +
        '<thead>' +
        '<tr data-bind="foreach: options.fields">' +
        '<th data-bind="template: { name: headerTemplate, data: { pager: $parent, field: $data } }, attr: { class: headerClass }">' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +		
		'<tr data-bind="visible: loading">' +
		'<td data-bind="attr: { colspan: fieldCount }">' +
		'<div class="progress">' +
		'<div class="progress-bar progress-bar-striped active" style="width: 100%">' +
		'Loading...' +
		'</div>' +
		'</div>' +
		'</td>' +
		'</tr>' +
		'<!-- ko foreach: shownData -->' +
        '<tr data-bind="foreach: $parent.options.fields">' +
        '<td data-bind="template: { name: contentTemplate, data: { pager: $parent, data: $parent, field: $data } }, attr: { class: contentClass, with: $parent }">' +
        '</td>' +
        '</tr>' +
		'<!-- /ko -->' +
        '</tbody>' +
        '</table>' +
        '</div>' +
		'<div class="row">' +
		'<div data-bind="template: options.templates.pageTemplate"></div>' +
		'<div data-bind="template: options.templates.buttonTemplate"></div>' +
		'</div>'
});

$("body").append(
    '<script type="text/html" id="ko-pager-default-header-template">' +
	'<span data-bind="click: function() { pager.setSort(field); }">' +
    '<span data-bind="if: field.sortable">' +
	'<span data-bind="attr: { class: pager.sort() === field.field ? pager.sortDown() ? pager.options.icons.sortDownIcon : pager.options.icons.sortUpIcon : pager.options.icons.sortNoneIcon }"></span>' +
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
	'<label data-bind="visible: showPageArea">Showing <span data-bind="text: minIndex"></span> - <span data-bind="text: maxIndex"></span> <span data-bind="visible: showMaximum">of <span data-bind="text: dataSize"></span></span>' +
    '</div>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-button-template">' +
	'<div class="row">' +
	'<div class="pull-right btn-group">' +
	'<button data-bind="template: options.templates.prevTemplate, enable: canPrev, click: prev, attr: { class: options.classes.prevClass }"></button>' +
	'<button data-bind="template: options.templates.nextTemplate, enable: canNext, click: next, attr: { class: options.classes.nextClass }"></button>' +
	'</div>' +
	'</div>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-size-template">' +
	'<div class="row"><div class="pull-right form-inline">' +
	'<label>Results per Page:</label> <select data-bind="options: options.increments, value: pageSize, attr: { class: options.classes.pageSizeClass }" ></select>' +
	'</div></div>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-next-template">' +
	'Next' +
	'<span data-bind="attr: { class: options.icons.nextIcon }"></span>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-prev-template">' +
	'<span data-bind="attr: { class: options.icons.prevIcon }"></span>' +
	'Previous' +
    '</script>'
);