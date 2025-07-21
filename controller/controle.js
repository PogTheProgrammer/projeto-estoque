"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var EstoqueService_1 = require("../service/EstoqueService");
var estoque = new EstoqueService_1.default();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function menu() {
    console.log('\n--- Menu de Estoque ---');
    console.log('1. Listar itens');
    console.log('2. Adicionar item');
    console.log('3. Remover item');
    console.log('4. Sair');
    rl.question('Escolha uma opção: ', function (opcao) {
        switch (opcao.trim()) {
            case '1':
                estoque.listar().forEach(function (item) {
                    return console.log("ID: ".concat(item.id, ", Nome: ").concat(item.name, ", Peso: ").concat(item.weight, "kg, Valor: R$").concat(item.value, ", Qtde: ").concat(item.quantity));
                });
                menu();
                break;
            case '2':
                rl.question('Nome: ', function (nome) {
                    rl.question('Peso (kg): ', function (peso) {
                        rl.question('Valor (R$): ', function (valor) {
                            rl.question('Quantidade: ', function (quantidade) {
                                console.log(estoque.adicionar({
                                    name: nome,
                                    weight: +peso,
                                    value: +valor,
                                    quantity: +quantidade
                                }));
                                menu();
                            });
                        });
                    });
                });
                break;
            case '3':
                rl.question('ID do item a remover: ', function (id) {
                    console.log(estoque.remover(+id));
                    menu();
                });
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Opção inválida.');
                menu();
        }
    });
}
menu();
