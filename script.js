let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function adicionarProduto() {

    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const valor = parseFloat(document.getElementById("valor").value);

    if (!nome || !categoria || !quantidade || !valor) {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = {
        nome: nome,
        categoria: categoria,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto salvo com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
