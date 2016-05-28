/*!
  Knockout Pager
  By: Bobby Cafazzo <bcafazzo@nbi.company>
      Now Business Intelligence, Inc.      
  License: MIT
*/
(function (factory) {
    if (typeof require === "function" && typeof exports === "object") {
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        define(["knockout", "exports"], factory);
    } else {
        factory(ko, ko.pager = {});
    }
}(function (ko, exports) {
    "use strict";

    exports = {
        defaults: {}
    };

    exports.defaults.paging = {
        pageSize: 25
    };

    ko.extenders.paging = function (table, params) {
        if (!ko.isObservable(table)) {
            throw new Error("Provided pagination target is not an observable!");
        }
        if (!length in table()) {
            throw new Error("Provided pagination target is not a collection.");
        }
        if (params && params.pageSize < 1) {
            throw new Error("Page size must be greater than zero.");
        }

        table.internal = table.internal || {};

        table.internal.page = ko.observable(1);
        table.page = ko.pureComputed({
            read: table.internal.page,
            write: function (value) {
                table.internal.page(Math.max(1, Math.min(table.pageCount(), Number(value))));
            }
        });

        table.internal.pageSize = ko.observable(params && params.pageSize || exports.defaults.paging.pageSize);
        table.pageSize = ko.pureComputed({
            read: table.internal.pageSize,
            write: function (value) {
                table.internal.pageSize(Number(value));
                if (table.page() > table.pageCount()) {
                    table.page(table.pageCount());
                }
            }
        });

        table.pageCount = ko.pureComputed(function () {
            return Math.ceil(table().length / table.pageSize());
        });

        table.pageStartIndex = ko.pureComputed(function () {
            return (table.page() - 1) * table.pageSize();
        });

        table.pageEndIndex = ko.pureComputed(function () {
            return Math.max(0, Math.min(table().length, table.pageStartIndex() + table.pageSize()) - 1);
        });

        table.pagedItems = ko.pureComputed(function () {
            return table.slice(table.pageStartIndex(), table.pageEndIndex() + 1);
        });

        table.hasPreviousPage = ko.pureComputed(function () {
            return table.page() > 1;
        });

        table.hasNextPage = ko.pureComputed(function () {
            return table.page() < table.pageCount();
        });

        table.firstPage = function () {
            table.page(1);
        };

        table.previousPage = function () {
            table.page(table.page() - 1);
        };

        table.nextPage = function () {
            table.page(table.page() + 1);
        };

        table.lastPage = function () {
            table.page(table.pageCount());
        }

        table.subscribe(function (value) {
            if (table.pageStartIndex() >= value.length) {
                table.previousPage();
            }
        });

        return table;
    };

    exports.defaults.sorting = {
        field: undefined,
        reverse: false,
        throttle: 50,
        classUp: undefined,
        textUp: "^",
        classDown: undefined,
        textDown: "v",
        classNeutral: undefined,
        textNeutral: "-"
    };

    ko.extenders.sorting = function (table, params) {
        if (!(table && typeof table.sort === "function")) {
            throw new Error("There was no sortable table provided!");
        }
        table.sortField = ko.observable(params && params.field || exports.defaults.sorting.field);
        table.sortReverse = ko.observable(params && params.reverse || exports.defaults.sorting.reverse);
        table.sortThrottle = ko.observable(params && params.throttle || exports.defaults.sorting.throttle)

        table.sortedItems = ko.computed(function () {
            var field = table.sortField();
            var reverse = table.sortReverse();
            return ko.unwrap(table).sort(function (left, right) {
                if (field) {
                    var leftField = ko.unwrap(left[field]);
                    var rightField = ko.unwrap(right[field]);
                    if (leftField || rightField) {
                        left = leftField;
                        right = rightField;
                    }
                }
                return (left == right ? 0 : (left < right ? -1 : 1)) * (reverse ? -1 : 1);
            });
        }).extend({ throttle: table.sortThrottle });
        return table;
    };

    ko.components.register('sorting-header', {
        viewModel: function (params) {
            if (!(params && params.table && typeof !ko.isComputed(params.table.sortedItems))) {
                throw new Error("There was no sortable table provided!");
            }
            var self = this;

            self.table = params.table;
            self.field = ko.observable(params.field);
            self.template = ko.observable(params.template);
            self.classUp = ko.observable(params.classUp || exports.defaults.sorting.classUp);
            self.textUp = ko.observable(params.textUp || exports.defaults.sorting.textUp);
            self.classDown = ko.observable(params.classDown || exports.defaults.sorting.classDown);
            self.textDown = ko.observable(params.textDown || exports.defaults.sorting.textDown);
            self.classNeutral = ko.observable(params.classNeutral || exports.defaults.sorting.classNeutral);
            self.textNeutral = ko.observable(params.textNeutral || exports.defaults.sorting.textNeutral);

            self.arrowClass = ko.pureComputed(function () {
                var field = self.table.sortField();
                if (field == self.field()) {
                    var reverse = self.table.sortReverse();
                    if (reverse) {
                        return self.classUp();
                    } else {
                        return self.classDown();
                    }
                } else {
                    return self.classNeutral();
                }
            });

            self.arrowText = ko.pureComputed(function () {
                var field = self.table.sortField();
                if (field == self.field()) {
                    var reverse = self.table.sortReverse();
                    if (reverse) {
                        return self.textUp();
                    } else {
                        return self.textDown();
                    }
                } else {
                    return self.textNeutral();
                }
            });

            self.clicked = function () {
                var field = self.table.sortField();
                var myField = self.field();
                if (field == myField) {
                    self.table.sortReverse(!self.table.sortReverse());
                } else {
                    self.table.sortReverse(false);
                    self.table.sortField(myField);
                }
            };

            return self;
        },
        template: "<div class=\"sorting-header\" data-bind=\"click: clicked\">" +
            "<span data-bind=\"css: arrowClass, text: arrowText\"></span>" +
            "<span data-bind=\"template: { nodes: $componentTemplateNodes }\"></span>" +
            "</div>"
    });
}));