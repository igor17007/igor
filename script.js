let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// 🔥 Adicionar produto
function adicionarProduto() {

    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const valor = parseFloat(document.getElementById("valor").value);

    if (!nome || isNaN(quantidade) || isNaN(valor)) {
        alert("Preencha todos os campos!");
        return;
    }

    produtos.push({
        nome,
        categoria,
        quantidade,
        valor
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto salvo com sucesso!");

    // limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // 🔥 ATUALIZA A TABELA
    carregarEstoque();
}


// 🔥 Carregar estoque na tabela
function carregarEstoque() {

    const lista = document.getElementById("listaProdutos");

    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {

        const total = produto.quantidade * produto.valor;

        lista.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>R$ ${total.toFixed(2)}</td>
                <td>
                    <button onclick="retirarProduto(${index})">➖</button>
                </td>
            </tr>
        `;
    });
}


// 🔥 Retirar produto
function retirarProduto(index) {

    let qtd = parseInt(prompt("Quantas unidades deseja retirar?"));

    if (isNaN(qtd) || qtd <= 0) return;

    if (qtd > produtos[index].quantidade) {
        alert("Quantidade maior que o estoque!");
        return;
    }

    produtos[index].quantidade -= qtd;

    if (produtos[index].quantidade <= 0) {
        produtos.splice(index, 1);
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));

    carregarEstoque();
}


// 🔥 Carrega automaticamente ao abrir a página
window.onload = carregarEstoque;
