//TRABALHO ATUALIZADO
interface DadosPessoa {
  nome: string;
  salario: number;
  horasExtras: number;
  salarioBruto: number;
  valorHorasExtras: number;
  faixaDescontoInss: number;
  valorDescontadoInss: number;
  faixaDescontoIr: number;
  valorDescontadoIr: number;
  totalVencimentos: number;
  salarioLiquido: number;
}
class Pessoa {

  constructor(nome: string, salario: number, horasExtrasAnual: number) {
    this.setNome(nome);
    this.setSalario(salario);
    this.setHorasExtras(horasExtrasAnual);
    this.setTotalHorasExtras();
    this.setTotalVencimentos();
    this.setSalarioBruto();
    this.setValorFaixaAliquota();
    this.setValorDescontoInss();
    this.setFaixaDescontoIr();
    this.setValorDescontadoIr();
    this.setSalarioLiquido();
  }

  private dadosPessoa = {} as DadosPessoa;

  //Sets
  setNome(nome: string): void {
    this.dadosPessoa.nome = nome;
  }

  setSalario(salario: number): void {
    this.dadosPessoa.salario = salario;
  }

  setHorasExtras(horas: number): void {
    this.dadosPessoa.horasExtras = horas;
  }

  setTotalHorasExtras(): void {
    let valorHoraExtra = (this.dadosPessoa.salario / 200) * 1.5;
    let valorTotalHorasExtras = valorHoraExtra * this.dadosPessoa.horasExtras;
    this.dadosPessoa.valorHorasExtras = valorTotalHorasExtras;
  }

  setTotalVencimentos(): void {
    let salarioTotalAnual = this.dadosPessoa.salario * 12;  
    let salarioBrutoAnual = salarioTotalAnual + this.dadosPessoa.valorHorasExtras;
    this.dadosPessoa.totalVencimentos = salarioBrutoAnual;
  }

  setSalarioBruto(): void {
    this.dadosPessoa.salarioBruto = this.dadosPessoa.totalVencimentos / 12;
  }
  
  setValorFaixaAliquota(): void {
    let salBruto = this.dadosPessoa.salarioBruto;
    let aliquota;

    if (salBruto <= 1212) {
      aliquota = 0.075;
    } else if (salBruto <= 2427.35) {
      aliquota = 0.09;
    } else if (salBruto <= 3641.03) {
      aliquota = 0.12;
    } else {
      aliquota = 0.14;
    }

    this.dadosPessoa.faixaDescontoInss = aliquota;
  }

  setValorDescontoInss(): void {
    this.dadosPessoa.valorDescontadoInss = parseFloat(((this.dadosPessoa.totalVencimentos / 12) * this.dadosPessoa.faixaDescontoInss).toFixed(2));
  }

  setFaixaDescontoIr(): void {
    let salarioDescontado = this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss;
    let desconto;
    if (salarioDescontado <= 1903.98) {
      desconto = 0;
    } else if (salarioDescontado <= 2826) {
      desconto = 0.075;
    } else if (salarioDescontado <= 3751.05) {
      desconto = 0.15
    } else if (salarioDescontado <= 4664.68) {
      desconto = 0.225;
    } else {
      desconto = 0.275
    }
    this.dadosPessoa.faixaDescontoIr = desconto;
  }

  setValorDescontadoIr(): void {
    this.dadosPessoa.valorDescontadoIr = parseFloat(((this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss) * this.dadosPessoa.faixaDescontoIr).toFixed(2));
  }
  
  setSalarioLiquido(): void {
    this.dadosPessoa.salarioLiquido = parseFloat((this.dadosPessoa.salario - (this.dadosPessoa.valorDescontadoInss / 12) - (this.dadosPessoa.valorDescontadoIr / 12) + (this.dadosPessoa.valorHorasExtras / 12)).toFixed(2));
  }

  //Gets
  getDadosPessoa(): DadosPessoa {
    return this.dadosPessoa;
  }

}

function modelo(nome: string, salario: number, horasExtrasAnual: number): void {

  const pessoa = new Pessoa(nome, salario, horasExtrasAnual);

  console.log(pessoa.getDadosPessoa());

}

modelo(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));