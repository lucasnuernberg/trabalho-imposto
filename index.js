var PessoaImposto = /** @class */ (function () {
    function PessoaImposto() {
        this.dadosPessoa = {};
    }
    //Sets
    PessoaImposto.prototype.setNome = function (nome) {
        this.dadosPessoa.nome = nome;
    };
    PessoaImposto.prototype.setSalario = function (salario) {
        this.dadosPessoa.salario = salario;
    };
    PessoaImposto.prototype.setHorasExtras = function (horas) {
        this.dadosPessoa.horasExtras = horas;
    };
    PessoaImposto.prototype.setTotalVencimentos = function () {
        var salarioTotalAnual = this.dadosPessoa.salario * 12;
        var valorHoraExtra = (this.dadosPessoa.salario / 200) * 1.5;
        var valorTotalHorasExtras = valorHoraExtra * this.dadosPessoa.horasExtras;
        var salarioBrutoAnual = salarioTotalAnual + valorTotalHorasExtras;
        this.dadosPessoa.totalVencimentos = salarioBrutoAnual;
    };
    PessoaImposto.prototype.setValorFaixaAliquota = function () {
        var salarioBrutoMensal = this.dadosPessoa.totalVencimentos / 12;
        var aliquota;
        if (salarioBrutoMensal <= 1212) {
            aliquota = 0.075;
        }
        else if (salarioBrutoMensal <= 2427.35) {
            aliquota = 0.09;
        }
        else if (salarioBrutoMensal <= 3641.03) {
            aliquota = 0.12;
        }
        else {
            aliquota = 0.14;
        }
        this.dadosPessoa.faixaDescontoInss = aliquota;
    };
    PessoaImposto.prototype.setValorDescontoInss = function () {
        this.dadosPessoa.valorDescontadoInss = (this.dadosPessoa.totalVencimentos / 12) * this.dadosPessoa.faixaDescontoInss;
    };
    PessoaImposto.prototype.setFaixaDescontoIr = function () {
        var salarioDescontado = this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss;
        var desconto;
        if (salarioDescontado <= 1903.98) {
            desconto = 0;
        }
        else if (salarioDescontado <= 2826) {
            desconto = 0.075;
        }
        else if (salarioDescontado <= 3751.05) {
            desconto = 0.15;
        }
        else if (salarioDescontado <= 4664.68) {
            desconto = 0.225;
        }
        else {
            desconto = 0.275;
        }
        this.dadosPessoa.faixaDescontoIr = desconto;
    };
    PessoaImposto.prototype.setValorDescontadoIr = function () {
        this.dadosPessoa.valorDescontadoIr = (this.dadosPessoa.salario - this.dadosPessoa.valorDescontadoInss) * this.dadosPessoa.faixaDescontoIr;
    };
    //Gets
    PessoaImposto.prototype.getNome = function () {
        return this.dadosPessoa.nome;
    };
    PessoaImposto.prototype.getSalario = function () {
        return this.dadosPessoa.salario;
    };
    PessoaImposto.prototype.getHorasExtras = function () {
        return this.dadosPessoa.horasExtras;
    };
    PessoaImposto.prototype.getDadosPessoa = function () {
        return this.dadosPessoa;
    };
    return PessoaImposto;
}());
function modelo(nome, salario, horasExtrasAnual) {
    var pessoa = new PessoaImposto();
    nome = process.argv[2];
    salario = parseInt(process.argv[3]);
    horasExtrasAnual = parseInt(process.argv[4]);
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
