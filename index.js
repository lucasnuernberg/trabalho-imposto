/* Com base nas instruções do link, crie um um algoritmo em TS que receba nome, salário e horas extras quando houver (base de cálculo 200 horas mensais).
O resultado no console desse programa deverá ser:
Nome
Valor salário bruto
Valor total de horas extra
Faixa de desconto do INSS
Valor descontado para o INSS
Faixa de desconto do IR
Valor descontado para o IR
Valor salário líquido (salário bruto - desconto INSS - desconto IR + horas extras)

Dicas:
Crie métodos separados para cada cálculo
Crie uma interface que represente o objeto a ser retornado
Crie logs de execução informando cada passo que o programa executa
Verifique a ordem de descontos na folha de pagamento

Modo de entrega:
Criar repositório no github e enviar o link nesta tarefa

Como informar argumentos via linha de comando?

Instalar a dependencia via terminal (CMD), no mesmo diretório do arquivo TS:

npm i --save-dev @types/node

Cria um arquivo exemplo com este conteúdo:

     modelo(process.argv[2], process.argv[3], process.argv[4]);


Logo após rode no terminal:

      node index.js NomeModelo 3.000 5
*/
function modelo(nome, salario, horasExtra) {
    console.log(nome);
    console.log(salario);
    console.log(horasExtra);
}
