// controller/controle.ts
import * as readline from 'readline';
import EstoqueService from '../service/estoqueService';
import { ItemInput } from '../model/interfaceData';

const estoque = new EstoqueService();
estoque.loadFromCSV('data.csv');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu(): void {
  console.log('\n--- Menu de Estoque ---');
  console.log('1. Listar itens');
  console.log('2. Adicionar item');
  console.log('3. Remover item');
  console.log('4. Sair');
  rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao.trim()) {
      case '1':
        estoque.listar().forEach(item =>
          console.log(`ID: ${item.id}, Nome: ${item.name}, Peso: ${item.weight}kg, Valor: R$${item.value}, Qtde: ${item.quantity}`)
        );
        menu();
        break;
      case '2':
        rl.question('Nome: ', nome => {
          rl.question('Peso (kg): ', peso => {
            rl.question('Valor (R$): ', valor => {
              rl.question('Quantidade: ', quantidade => {
                // Validate inputs
                if (!nome || isNaN(+peso) || isNaN(+valor) || isNaN(+quantidade)) {
                  console.log('Entradas inválidas. Tente novamente.');
                  menu();
                  return;
                }
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
        rl.question('ID do item a remover: ', id => {
          if (isNaN(+id)) {
            console.log('ID inválido. Tente novamente.');
            menu();
            return;
          }
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