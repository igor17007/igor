// ============================
// BASE DO SISTEMA
// ============================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// ============================
// ADICIONAR PRODUTO
// ============================

function adicionarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!nome || quantidade <= 0 || valor <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const existente = produtos.find(
        p => p.nome.toLowerCase() === nome.toLowerCase()
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

    alert("Produto adicionado com sucesso!");

    // limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    atualizarDashboard();
}

// ============================
// DASHBOARD (INDEX)
// ============================

function atualizarDashboard() {

    produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const totalProdutos = produtos.length;

    let valorTotal = 0;

    produtos.forEach(p => {
        valorTotal += p.quantidade * p.valor;
    });

    const el1 = document.getElementById("totalProdutos");
    const el2 = document.getElementById("valorTotal");

    if (el1) el1.innerText = totalProdutos;
    if (el2) el2.innerText = "R$ " + valorTotal.toFixed(2);
}

// ============================
// CARREGAR ESTOQUE
// ============================

function carregarEstoque() {

    produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const tabela = document.getElementById("listaProdutos");

    if (!tabela) return;

    tabela.innerHTML = "";

    let total = 0;

    produtos.forEach((p, i) => {

        const subtotal = p.quantidade * p.valor;
        total += subtotal;

        tabela.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn-retirar" onclick="retirarProduto(${i})">➖</button>
                    <button class="btn-excluir" onclick="excluirProduto(${i})">🗑️</button>
                </td>
            </tr>
        `;
    });

    const totalEl = document.getElementById("valorTotalEstoque");
    if (totalEl) totalEl.innerText = "R$ " + total.toFixed(2);
}

// ============================
// RETIRAR PRODUTO
// ============================

function retirarProduto(i) {

    const qtd = Number(prompt("Quantas unidades deseja retirar?"));

    if (isNaN(qtd) || qtd <= 0) return;

    if (qtd > produtos[i].quantidade) {
        alert("Quantidade maior que o estoque!");
        return;
    }

    produtos[i].quantidade -= qtd;

    if (produtos[i].quantidade <= 0) {
        produtos.splice(i, 1);
    }

    salvarDados();
    carregarEstoque();
}

// ============================
// EXCLUIR PRODUTO
// ============================

function excluirProduto(i) {

    if (!confirm("Deseja excluir este produto?")) return;

    produtos.splice(i, 1);

    salvarDados();
    carregarEstoque();
}

// ============================
// FILTRO DE PRODUTOS
// ============================

function filtrarProdutos() {

    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    const linhas = document.querySelectorAll("#listaProdutos tr");

    linhas.forEach(linha => {

        const nome = linha.querySelector("td")?.innerText.toLowerCase();

        linha.style.display =
            nome && nome.includes(pesquisa)
                ? ""
                : "none";
    });
}

// ============================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================

window.onload = function () {
    carregarEstoque();
    atualizarDashboard();
};
