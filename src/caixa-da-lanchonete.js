class CaixaDaLanchonete {
    constructor() {
        // Definindo o cardápio com os itens e seus valores
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verificando a forma de pagamento
        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Verificando se há itens no carrinho de compra
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const itensPrincipais = {};

        // Calculando o valor total da compra
        for (const itemInfo of itens) {
            const [itemCodigo, quantidade] = itemInfo.split(',');
            const item = this.cardapio[itemCodigo];

            // Verificando se o item é válido
            if (!item) {
                return "Item inválido!";
            }

            // Verificando se a quantidade é válida
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            // Calculando o valor do item
            valorTotal += item.valor * parseInt(quantidade);

            // Contabilizando os itens principais
            if (itemCodigo !== 'chantily' && itemCodigo !== 'queijo') {
                itensPrincipais[itemCodigo] = (itensPrincipais[itemCodigo] || 0) + parseInt(quantidade);
            }
        }

        // Verificando se itens extras são pedidos sem os itens principais correspondentes
        for (const itemInfo of itens) {
            const [itemCodigo] = itemInfo.split(',');

            if (itemCodigo === 'chantily' || itemCodigo === 'queijo') {
                const principal = itemCodigo === 'chantily' ? 'cafe' : 'sanduiche';

                if (!itensPrincipais[principal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        // Aplicando descontos/acréscimos conforme a forma de pagamento
        if (formaDePagamento === "dinheiro") {
            valorTotal *= 0.95; // Aplica 5% de desconto
        } else if (formaDePagamento === "credito") {
            valorTotal *= 1.03; // Aplica 3% de acréscimo
        }

        // Formatando o valor total da compra e retornando
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };

