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
                table.internal.page(Math.max(1, Math.min(table.pageCount(), Number(value))));
            }
        });

        table.internal.pageSize = ko.observable(params && params.pageSize || exports.defaults.pageSize || defaultPageSize);
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
    };
}));