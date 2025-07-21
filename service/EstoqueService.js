"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var arquivoCSV_ts_1 = require("../model/arquivoCSV.ts");
var EstoqueService = /** @class */ (function () {
    function EstoqueService() {
        this.caminho = 'estoque.csv';
        this.itens = [];
        this.carregar();
    }
    EstoqueService.prototype.carregar = function () {
        try {
            var linhas = (0, arquivoCSV_ts_1.lerCSV)(this.caminho);
            this.itens = linhas.map(function (l) {
                var id = l[0], name = l[1], weight = l[2], value = l[3], quantity = l[4], active = l[5];
                return {
                    id: +id,
                    name: name,
                    weight: +weight,
                    value: +value,
                    quantity: +quantity,
                    active: active === '1'
                };
            });
        }
        catch (_a) {
            this.itens = [];
        }
    };
    EstoqueService.prototype.salvar = function () {
        var linhas = this.itens
            .filter(function (i) { return i.active; })
            .map(function (i) { return "".concat(i.id, ",").concat(i.name, ",").concat(i.weight, ",").concat(i.value, ",").concat(i.quantity, ",").concat(i.active ? 1 : 0); });
        (0, arquivoCSV_ts_1.salvarCSV)(this.caminho, linhas);
    };
    EstoqueService.prototype.listar = function () {
        return this.itens.filter(function (i) { return i.active; });
    };
    EstoqueService.prototype.adicionar = function (item) {
        var id = this.itens.length ? Math.max.apply(Math, this.itens.map(function (i) { return i.id; })) + 1 : 1;
        this.itens.push(__assign(__assign({}, item), { id: id, active: true }));
        this.salvar();
        return 'Item adicionado com sucesso!';
    };
    EstoqueService.prototype.remover = function (id) {
        var item = this.itens.find(function (i) { return i.id === id && i.active; });
        if (!item)
            return 'Item não encontrado.';
        item.active = false;
        this.salvar();
        return 'Item removido.';
    };
    return EstoqueService;
}());
exports.default = EstoqueService;
