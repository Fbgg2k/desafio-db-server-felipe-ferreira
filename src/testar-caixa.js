const { CaixaDaLanchonete } = require('./caixa-da-lanchonete');

const caixa = new CaixaDaLanchonete();

const formaDePagamento = 'debito';
const itens = ['cafe,2', 'sanduiche,1', 'queijo,1'];

const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

console.log(resultado);

