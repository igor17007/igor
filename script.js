let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const valor = parseFloat(
        document.getElementById("valor").value.replace(",", ".")
    );

    if (!nome || isNaN(quantidade) || isNaN(valor)) {
        alert("Preencha todos os campos!");
        return;
    }

    const produtoExistente = produtos.find(
        p => p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
        produtoExistente.valor = valor;
        produtoExistente.categoria = categoria;
    } else {
        produtos.push({
            nome,
            categoria,
            quantidade,
            valor
        });
    }

    salvarDados();

    alert("Produto salvo com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function carregarEstoque() {

    const tabela = document.getElementById("listaProdutos");

    if (!tabela) return;

    tabela.innerHTML = "";

    let valorTotal = 0;

    produtos.forEach((produto, indice) => {

        const totalProduto =
            produto.quantidade * produto.valor;

        valorTotal += totalProduto;

        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>R$ ${totalProduto.toFixed(2)}</td>
                <td>
                    <button class="btn-retirar"
                        onclick="retirarProduto(${indice})">
                        ➖
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${indice})">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    });

    const total = document.getElementById("valorTotalEstoque");

    if (total) {
        total.innerHTML = `R$ ${valorTotal.toFixed(2)}`;
    }
}

function retirarProduto(indice) {

    let quantidade = prompt(
        `Quantas unidades deseja retirar de ${produtos[indice].nome}?`
    );

    quantidade = parseInt(quantidade);

    if (isNaN(quantidade) || quantidade <= 0) {
        return;
    }

    if (quantidade > produtos[indice].quantidade) {
        alert("Quantidade maior que o estoque!");
        return;
    }

    produtos[indice].quantidade -= quantidade;

    if (produtos[indice].quantidade <= 0) {
        produtos.splice(indice, 1);
    }

    salvarDados();
    carregarEstoque();
}

function excluirProduto(indice) {

    if (confirm("Deseja excluir este produto?")) {

        produtos.splice(indice, 1);

        salvarDados();
        carregarEstoque();
    }
}

function filtrarProdutos() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const linhas = document.querySelectorAll(
        "#listaProdutos tr"
    );

    linhas.forEach(linha => {

        const texto = linha.innerText.toLowerCase();

        linha.style.display =
            texto.includes(pesquisa)
                ? ""
                : "none";
    });
}
