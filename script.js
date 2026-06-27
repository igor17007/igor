
let estoque = JSON.parse(localStorage.getItem("estoque")) || [];

function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
}

function adicionarProduto() {
    let nome = document.getElementById("nome").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (nome === "" || quantidade <= 0 || valor <= 0) {
        alert("Preencha todos os campos!");
        return;
    }

    let produtoExistente = estoque.find(
        p => p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
        produtoExistente.valor = valor;
    } else {
        estoque.push({
            nome,
            quantidade,
            valor
        });
    }

    salvarEstoque();

    alert("Produto adicionado com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function mostrarEstoque() {

    let lista = document.getElementById("lista");

    if (!lista) return;

    lista.innerHTML = "";

    if (estoque.length === 0) {
        lista.innerHTML = "<p>Estoque vazio.</p>";
        return;
    }

    estoque.forEach(produto => {

        let total = produto.quantidade * produto.valor;

        lista.innerHTML += `
            <div class="produto">
                <h3>${produto.nome}</h3>
                <p>Quantidade: ${produto.quantidade}</p>
                <p>Valor Unitário: R$ ${produto.valor.toFixed(2)}</p>
                <p>Valor Total: R$ ${total.toFixed(2)}</p>
            </div>
        `;
    });
}

function retirarProduto() {

    let nome = document.getElementById("nomeRetirar").value;
    let quantidade = Number(document.getElementById("qtdRetirar").value);

    let produto = estoque.find(
        p => p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Quantidade maior que o estoque!");
        return;
    }

    produto.quantidade -= quantidade;

    if (produto.quantidade === 0) {
        estoque = estoque.filter(
            p => p.nome.toLowerCase() !== nome.toLowerCase()
        );
    }

    salvarEstoque();

    alert("Produto retirado com sucesso!");

    document.getElementById("nomeRetirar").value = "";
    document.getElementById("qtdRetirar").value = "";
}
