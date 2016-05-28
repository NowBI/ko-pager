/*!
  Knockout Pager
  By: Bobby Cafazzo <bcafazzo@nbi.company>
      Now Business Intelligence, Inc.      
  License: MIT
*/
(function (factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
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

        table.pageSize = ko.observable(params && params.pageSize || exports.defaults.pageSize || defaultPageSize);
        table.page = ko.observable(1);

        table.pageCount = ko.pureComputed(function () {
            return Math.floor(table().length / table.pageSize()) + 1;
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

        table.onFirstPage = function () {
            return table.page() === 1;
        };

        table.firstPage = function () {
            table.page(1);
        };

        table.onLastPage = function () {
            return table.page() === table.pageCount();
        };

        table.lastPage = function () {
            table.page(table.pageCount());
        }
    };

}));