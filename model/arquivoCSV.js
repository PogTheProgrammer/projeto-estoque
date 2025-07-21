"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerCSV = lerCSV;
exports.salvarCSV = salvarCSV;
var fs = require("fs");
var sync_1 = require("csv-parse/sync");
function lerCSV(caminho) {
    var conteudo = fs.readFileSync(caminho, 'utf-8');
    return (0, sync_1.parse)(conteudo, {
        skip_empty_lines: true,
        trim: true
    });
}
function salvarCSV(caminho, linhas) {
    fs.writeFileSync(caminho, linhas.join('\n'));
}
