interface DadosPessoa {
  nome: string;
  salario: number;
  horasExtras: number;
  salarioBase: number;
  valorHorasExtras: number;
  faixaDescontoInss: number;
  valorDescontadoInss: number;
  faixaDescontoIr: number;
  valorDescontadoIr: number;
  salarioLiquido: number;
  totalVencimentos: number;
}

class Pessoa {

  constructor() {
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

  setTotalVencimentos() {
    const salarioTotalAnual = this.dadosPessoa.salario * 12;
    const valorHoraExtra = (this.dadosPessoa.salario / 200) * 1.5;
    let valorTotalHorasExtras = valorHoraExtra * this.dadosPessoa.horasExtras;  
    const salarioBrutoAnual = salarioTotalAnual + valorTotalHorasExtras;

    this.dadosPessoa.totalVencimentos = salarioBrutoAnual;
  }
  
  setValorFaixaAliquota() {
    const salarioBrutoMensal = this.dadosPessoa.totalVencimentos / 12;
    let aliquota;

    if (salarioBrutoMensal <= 1212) {
      aliquota = 0.075;
    } else if (salarioBrutoMensal <= 2427.35) {
      aliquota = 0.09;
    } else if (salarioBrutoMensal <= 3641.03) {
      aliquota = 0.12;
    } else {
      aliquota = 0.14;
    }

    this.dadosPessoa.faixaDescontoInss = aliquota;
  }

  setValorDescontoInss() {
    this.dadosPessoa.valorDescontadoInss = (this.dadosPessoa.totalVencimentos / 12) * this.dadosPessoa.faixaDescontoInss;
  }


  setFaixaDescontoIr(): void {
    const salarioDescontado = this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss;
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
    this.dadosPessoa.valorDescontadoIr = (this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss) * this.dadosPessoa.faixaDescontoIr;
  }

  //Gets
  getNome(): string {
    return this.dadosPessoa.nome;
  }

  getSalario(): number {
    return this.dadosPessoa.salario;
  }

  getHorasExtras(): number {
    return this.dadosPessoa.horasExtras;
  }

  getDadosPessoa(): DadosPessoa {
    return this.dadosPessoa;
  }

}

function modelo(nome: string, salario: number, horasExtrasAnual: number): void {

  const pessoa = new Pessoa();

  nome = process.argv[2]
  salario = parseInt(process.argv[3])
  horasExtrasAnual = parseInt(process.argv[4])

  pessoa.setNome(nome);
  pessoa.setSalario(salario);
  pessoa.setHorasExtras(horasExtrasAnual);
  pessoa.setTotalVencimentos();
  pessoa.setValorFaixaAliquota();
  pessoa.setValorDescontoInss();
  pessoa.setFaixaDescontoIr();
  pessoa.setValorDescontadoIr();

  console.log(pessoa.getDadosPessoa());

}

modelo(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));