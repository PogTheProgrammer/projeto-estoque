// service/estoqueService.ts
import { Item, ItemInput } from '../model/interfaceData';
import { lerCSV, salvarCSV } from '../model/arquivoCSV';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export default class EstoqueService {
  private itens: Item[];

  constructor() {
    this.itens = [];
  }

  loadFromCSV(filePath: string) {
    if (fs.existsSync(filePath)) {
      const linhas = lerCSV(filePath);
      this.itens = linhas.map((l: string[]) => {
        const [id, name, weight, value, quantity, active] = l;
        return {
          id: parseInt(id),
          name,
          weight: parseFloat(weight),
          value: parseFloat(value),
          quantity: parseInt(quantity),
          active: active === 'true'
        };
      });
    } else {
      console.log(`Arquivo ${filePath} não encontrado. Iniciando com estoque vazio.`);
      this.itens = [];
    }
  }

  saveToCSV(filePath: string) {
    salvarCSV(filePath, this.itens);
  }

  listar(): Item[] {
    return this.itens;
  }

  adicionar(item: ItemInput): string {
    const newItem: Item = {
      id: item.id ?? this.itens.length + 1,
      name: item.name,
      weight: item.weight,
      value: item.value,
      quantity: item.quantity,
      active: item.active ?? true
    };
    this.itens.push(newItem);
    this.saveToCSV('data.csv');
    return `Item ${newItem.name} adicionado com sucesso`;
  }

  remover(id: number): string {
    const index = this.itens.findIndex(item => item.id === id);
    if (index !== -1) {
      const [removedItem] = this.itens.splice(index, 1);
      this.saveToCSV('data.csv');
      return `Item ${removedItem.name} removido com sucesso`;
    }
    return `Item com ID ${id} não encontrado`;
  }
}