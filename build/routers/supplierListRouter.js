"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var supplierListModel_1 = require("../models/supplierListModel");
var SupplierListRouter = (function () {
    function SupplierListRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    SupplierListRouter.prototype.getSuppliers = function (req, res) {
        supplierListModel_1.default.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    SupplierListRouter.prototype.AddSupplier = function (req, res) {
        var name = req.body.name;
        var price = req.body.price;
        var date = req.body.date;
        if (!name || !price || !date) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var supplierList = new supplierListModel_1.default({
            name: name,
            price: price,
            date: date,
        });
        supplierList.save()
            .then(function (supplierList) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                supplierList: supplierList
            });
        })
            .catch(function (error) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                error: error
            });
        });
    };
    // update supplier by id
    SupplierListRouter.prototype.UpdateSupplier = function (req, res, next) {
        var supplierId = req.params.supplierId;
        supplierListModel_1.default.findByIdAndUpdate(supplierId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    SupplierListRouter.prototype.DeleteSupplier = function (req, res) {
        var supplierId = req.params.supplierId;
        supplierListModel_1.default.findByIdAndRemove(supplierId, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    //Connnect URIs to the specific function
    SupplierListRouter.prototype.routes = function () {
        this.router.get('/', this.getSuppliers);
        this.router.post('/', this.AddSupplier);
        this.router.put('/:supplierId', this.UpdateSupplier);
        this.router.delete('/:supplierId', this.DeleteSupplier);
    };
    return SupplierListRouter;
}());
//export 
var supplierListRoutes = new SupplierListRouter();
supplierListRoutes.routes();
exports.default = supplierListRoutes.router;
//# sourceMappingURL=supplierListRouter.js.map