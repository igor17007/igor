let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// SALVAR
function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// ADICIONAR
function adicionarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!nome || !categoria || quantidade <= 0 || valor <= 0) {
        alert("Preencha corretamente!");
        return;
    }

    produtos.push({
        nome,
        categoria,
        quantidade,
        valor
    });

    salvar();

    alert("Produto adicionado!");

    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    carregarEstoque();
}

// RENDERIZAR
function carregarEstoque() {

    const lista = document.getElementById("lista");
    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach((p, index) => {

        const total = p.quantidade * p.valor;

        lista.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>
                <td>R$ ${total.toFixed(2)}</td>
                <td>
                    <button onclick="remover(${index})">❌</button>
                </td>
            </tr>
        `;
    });
}

// REMOVER
function remover(index) {
    produtos.splice(index, 1);
    salvar();
    carregarEstoque();
}

// AUTO LOAD
window.onload = carregarEstoque;
