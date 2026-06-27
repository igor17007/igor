let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarDados() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

function adicionarProduto() {

    let nome =
        document.getElementById("nome").value;

    let categoria =
        document.getElementById("categoria").value;

    let quantidade =
        Number(document.getElementById("quantidade").value);

    let valor =
        Number(document.getElementById("valor").value);

    if (
        nome === "" ||
        quantidade <= 0 ||
        valor <= 0
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    let existente = produtos.find(
        p =>
        p.nome.toLowerCase() ===
        nome.toLowerCase()
    );

    if (existente) {

        existente.quantidade += quantidade;
        existente.valor = valor;
        existente.categoria = categoria;

    } else {

        produtos.push({
            nome,
            categoria,
            quantidade,
            valor
        });

    }

    salvarDados();

    alert("Produto adicionado!");

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function atualizarDashboard() {

    let totalProdutos = produtos.length;

    let valorTotal = 0;

    produtos.forEach(produto => {

        valorTotal +=
            produto.quantidade *
            produto.valor;

    });

    let cardProdutos =
        document.getElementById(
            "totalProdutos"
        );

    let cardValor =
        document.getElementById(
            "valorTotal"
        );

    if (cardProdutos) {

        cardProdutos.innerHTML =
            totalProdutos;

    }

    if (cardValor) {

        cardValor.innerHTML =
            "R$ " +
            valorTotal.toFixed(2);

    }

}
