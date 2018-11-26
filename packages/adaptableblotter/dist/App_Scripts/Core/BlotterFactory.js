"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlotterFactoryHypergrid_1 = require("../Vendors/Hypergrid/BlotterFactoryHypergrid");
const BlotterFactoryAgGrid_1 = require("../Vendors/agGrid/BlotterFactoryAgGrid");
var BlotterFactory;
(function (BlotterFactory) {
    function CreateAdaptableBlotter(adaptableBlotterOptions, vendorGridName) {
        switch (vendorGridName) {
            case 'agGrid':
                return BlotterFactoryAgGrid_1.BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
            case 'Hypergrid':
                return BlotterFactoryHypergrid_1.BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
        }
    }
    BlotterFactory.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactory = exports.BlotterFactory || (exports.BlotterFactory = {}));
