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
        factory(ko, ko.pagination = {});
    }
}(function (ko, exports) {
    "use strict";

    var defaultPageSize = 25;

    exports = {
        defaults: {
            pageSize: defaultPageSize
        }
    };

    ko.extenders.pagination = function (table, params) {
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
                table.internal.page(Number(value));
            }
        });

        table.internal.pageSize = ko.observable(params && params.pageSize || exports.defaults.pageSize || defaultPageSize);
        table.pageSize = ko.pureComputed({
            read: table.internal.pageSize,
            write: function (value) {
                var newValue = Number(value);
                var currentIndex = table.pageStartIndex();
                table.internal.pageSize(newValue);
                table.page(Math.ceil((currentIndex + 1) / newValue));
            }
        });

        table.pageCount = ko.pureComputed(function () {
            return Math.ceil(table().length / table.pageSize());
        });

        table.pageStartIndex = ko.pureComputed(function () {
            return (table.page() - 1) * table.pageSize();
        });

        table.pageEndIndex = ko.pureComputed(function () {
            return table.pageStartIndex() + table.pageSize();
        });

        table.pagedItems = ko.pureComputed(function () {
            return table.slice(table.pageStartIndex(), table.pageEndIndex());
        });

        table.hasNextPage = ko.pureComputed(function () {
            return table.pageEndIndex() <= table().length;
        });

        table.nextPage = function () {
            if (table.hasNextPage()) {
                table.page(table.page() + 1);
            }
        };

        table.hasPreviousPage = ko.pureComputed(function () {
            return table.pageStartIndex() > 0;
        });

        table.previousPage = function () {
            if (table.hasPreviousPage()) {
                table.page(table.page() - 1);
            }
        };

        table.firstPage = function () {
            if (table.hasPreviousPage()) {
                table.page(1);
            }
        };

        table.lastPage = function () {
            if (table.hasNextPage()) {
                table.page(table.pageCount());
            }
        }
    };
}));