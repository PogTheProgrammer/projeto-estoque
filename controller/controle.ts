import * as readline from 'readline';
import EstoqueService from '../service/estoqueService';
import { ItemInput } from '../model/interfaceData';

const estoque = new EstoqueService();
estoque.loadFromCSV('data.csv');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function formatCurrency(value: number): string {
  return `R$${value.toFixed(2).replace('.', ',')}`;
}

function menu(): void {
  console.log('\n--- Menu de Estoque ---');
  console.log('1. Listar itens');
  console.log('2. Adicionar item');
  console.log('3. Remover item');
  console.log('4. Ver Valor Total do Inventário');
  console.log('5. Ver Peso Total do Inventário');
  console.log('6. Calcular Média de Valor dos Itens');
  console.log('7. Calcular Média de Peso dos Itens');
  console.log('8. Ver Quantidade Total de Itens');
  console.log('9. Ver Quantidade Total de Produtos');
  console.log('10. Sair');
  rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao.trim()) {
      case '1':
        estoque.listar().forEach(item =>
          console.log(`ID: ${item.id}, Nome: ${item.name}, Peso: ${item.weight}kg, Valor: ${formatCurrency(item.value)}, Qtde: ${item.quantity}`)
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
        const totalValue = estoque.listar().reduce((sum, item) => sum + (item.value * item.quantity), 0);
        console.log(`Valor total do inventário: ${formatCurrency(totalValue)}`);
        menu();
        break;
      case '5':
        const totalWeight = estoque.listar().reduce((sum, item) => sum + (item.weight * item.quantity), 0);
        console.log(`Peso total do inventário: ${totalWeight.toFixed(2)}kg`);
        menu();
        break;
      case '6':
        const items = estoque.listar();
        const avgValue = items.length > 0 ? items.reduce((sum, item) => sum + item.value, 0) / items.length : 0;
        console.log(`Média de valor dos itens: ${formatCurrency(avgValue)}`);
        menu();
        break;
      case '7':
        const itemsForWeight = estoque.listar();
        const avgWeight = itemsForWeight.length > 0 ? itemsForWeight.reduce((sum, item) => sum + item.weight, 0) / itemsForWeight.length : 0;
        console.log(`Média de peso dos itens: ${avgWeight.toFixed(2)}kg`);
        menu();
        break;
      case '8':
        const totalItems = estoque.listar().reduce((sum, item) => sum + item.quantity, 0);
        console.log(`Quantidade total de itens: ${totalItems}`);
        menu();
        break;
      case '9':
        const uniqueProducts = estoque.listar().length;
        console.log(`Quantidade total de produtos únicos: ${uniqueProducts}`);
        menu();
        break;
      case '10':
        rl.close();
        break;
      default:
        console.log('Opção inválida.');
        menu();
    }
  });
}

menu();