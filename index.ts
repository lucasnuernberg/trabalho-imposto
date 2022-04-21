interface DadosRetornados {
  nome: String
  salarioBase: number
  valorHorasExtras: number
  faixaDescontoInss: number
  valorDescontadoInss: number
  faixaDescontoIr: number
  valorDescontadoIr: number
  salarioLiquido: number
}

function modelo(nome: string, salario: number, horasExtrasAnual: number) {
  let dadosRetornados = {} as DadosRetornados
  nome = process.argv[2]
  salario = parseInt(process.argv[3])
  horasExtrasAnual = parseInt(process.argv[4])

  const salarioBruto = totalVencimentos(salario, horasExtrasAnual)
  const descontoInss = calculoInss(salarioBruto)
  const descontoIr = calculoIr(salario, descontoInss[0])

  const salarioTotalAnual = salario * 12
  const valorHoraExtra = (salario / 200) * 1.5
  let totalHorasExtras = valorHoraExtra * horasExtrasAnual
  let salarioLiquido =
    salario - descontoInss[0] - descontoIr[0] + totalHorasExtras

  dadosRetornados = {
    nome: nome,
    salarioBase: salarioBruto,
    valorHorasExtras: totalHorasExtras,
    faixaDescontoInss: descontoInss[1],
    valorDescontadoInss: descontoInss[0],
    faixaDescontoIr: descontoIr[1],
    valorDescontadoIr: descontoIr[0],
    salarioLiquido: salarioLiquido
  }
  return dadosRetornados
}

function totalVencimentos(salario: number, horasExtras: number) {
  const salarioTotalAnual = salario * 12
  const valorHoraExtra = (salario / 200) * 1.5
  let totalHorasExtras = valorHoraExtra * horasExtras

  const salarioBrutoAnual = salarioTotalAnual + totalHorasExtras
  return salarioBrutoAnual
}

function calculoInss(salarioBruto: number) {
  const salarioBrutoMensal = salarioBruto / 12
  let aliquota = 0

  if (salarioBrutoMensal <= 1212) {
    aliquota = 0.075
  } else if (salarioBrutoMensal <= 2427.35) {
    aliquota = 0.09
  } else if (salarioBrutoMensal <= 3641.03) {
    aliquota = 0.12
  } else {
    aliquota = 0.14
  }

  return [salarioBrutoMensal * aliquota, aliquota]
}

function calculoIr(salario: number, descontoInss: number) {
  const salarioDescontado = salario - descontoInss
  let desconto = 0
  if (salarioDescontado <= 1903.98) {
    desconto = 0
  } else if (salarioDescontado <= 2826) {
    desconto = 0.075
  } else if (salarioDescontado <= 3751.05) {
    desconto = 0.15
  } else if (salarioDescontado <= 4664.68) {
    desconto = 0.225
  } else {
    desconto = 0.275
  }

  return [salarioDescontado * desconto, desconto]
}

const objetoDados = modelo(
  process.argv[2],
  parseInt(process.argv[3]),
  parseInt(process.argv[4])
)

console.log(objetoDados.nome)
console.log('Salario bruto: ' + objetoDados.salarioBase)
console.log('Valor total horas extras: ' + objetoDados.valorHorasExtras)
console.log('Faixa desconto INSS: ' + objetoDados.faixaDescontoInss)
console.log('Desconto INSS: ' + objetoDados.valorDescontadoInss)
console.log('Faixa desconto IR :' + objetoDados.faixaDescontoIr)
console.log('Desconto IR: ' + objetoDados.valorDescontadoIr)
console.log('Valor salário liquido: ' + objetoDados.salarioLiquido)
