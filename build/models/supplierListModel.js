"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SupplierListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    date: {
        type: Date
    }
});
exports.default = mongoose_1.model('SupplierList', SupplierListSchema);
//# sourceMappingURL=supplierListModel.js.map