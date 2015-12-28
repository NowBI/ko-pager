"use strict"

/*******************
 * ko-pager.js 0.0.1
 *******************/
 
var koPager = koPager || {};
koPager.pagerDefaults = koPager.pagerDefaults || {
    selection: false,
    increments: [10, 25, 50, 100],
    init: null,
    refresh: null,
    transform: function (data) {
        return data;
    },
    endpoint: null,
    method: null,
    filters: {},
    sortUpIcon: "glyphicon glyphicon-chevron-up",
    sortDownIcon: "glyphicon glyphicon-chevron-down",
    sortNoneIcon: "glyphicon glyphicon-minus",
    class: 'table table-striped'
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
        console.log(self.options);
        self.data = ko.observableArray(ko.utils.unwrapObservable(self.options.data || []));
        self.options.fields = (self.options.fields || []).map(function (item) {
            console.log(item);
            return $.extend({}, koPager.fieldDefaults, item);
        });
        console.log(self.options.fields);
    },
    template: '<div class="table-responsive">' +
        '<table class="table table-striped">' +
        '<thead>' +
        '<tr data-bind="foreach: options.fields">' +
        '<th data-bind="template: { name: headerTemplate, data: { pager: $parent, field: $data } }, attr: { class: headerClass }">' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody data-bind="foreach: data">' +
        '<tr data-bind="foreach: $parent.options.fields">' +
        '<td data-bind="template: { name: contentTemplate, data: { pager: $parent.$parent, data: $parent, field: $data } }, attr: { class: contentClass, with: $parent }">' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>'
});

$("body").append(
    '<script type="text/html" id="ko-pager-default-header-template">' +
    '<span data-bind="text: field.title"></span>' +
    '</script>'
);
$("body").append(
    '<script type="text/html" id="ko-pager-default-content-template">' +
    '<span data-bind="text: data[field.field]"></span>' +
    '</script>'
);