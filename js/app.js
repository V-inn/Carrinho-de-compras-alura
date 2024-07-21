const listaDeCompras = document.getElementById("lista-produtos");
const produtoSelecionado = document.getElementById("produto");

var valorTotal = document.getElementById("valor-total");
var valorTotalInterno = parseInt(valorTotal.textContent.split("R$")[1]);

//Adiciona items na lista de compras
function adicionar(){
    var produto = extrairInfomacoesDeUmItem(produtoSelecionado.value);
    var quantidade = parseInt(document.getElementById("quantidade").value);

    if(isNaN(quantidade)){
        alert("Insira uma quantidade valida")
        return;
    }

    let itemExiste = false;

    //Verifica a existencia do item na lista de compras, se ele existir, editar valores, caso contrário criar novo item.
    for(var child of listaDeCompras.children){
        const itemNaLista = extrairInfomacoesDeUmItem(formataItemDaListaDeComprasComoString(child));
        
        if(itemNaLista.Nome == produto.Nome){
            child.firstElementChild.textContent = (extrairQuantidadeDeItemNaListaDeCompras(child) + quantidade) + "x"
            itemExiste = true;
            break;
        }
    }

    if(!itemExiste){
        adicionarProdutoNaListaDeCompras(quantidade, produto.Nome, produto.Valor);
    }

    //Valor se mantém o mesmo se item existe ou não, pois aquele item já está incluso.
    alteraValorTotal(valorTotalInterno + (produto.Valor * quantidade));
}

function limpar(){
    listaDeCompras.innerHTML = "";
    alteraValorTotal(0);
}

function alteraValorTotal(novoValor){
    valorTotal.textContent = "R$"+novoValor;
    valorTotalInterno = novoValor;
}

function adicionarProdutoNaListaDeCompras(quantidade, nome, valor){
    listaDeCompras.innerHTML += `
            <section class="carrinho__produtos__produto">
                <span class="texto-azul">${quantidade}x</span> ${nome} <span class="texto-azul">R$${valor}</span>
            </section>`;
}


//Extrai a quantidade de um determinado produto na lista de compras.
function extrairQuantidadeDeItemNaListaDeCompras(item){
    return parseInt(item.querySelector('.texto-azul').textContent.slice(0,-1))
}


//Formata um item da lista de compras para o formato "Nome - R$XXXX"
function formataItemDaListaDeComprasComoString(item){
    const itemSpan = item.querySelector('.texto-azul:last-child');
    const itemName = itemSpan.previousSibling.textContent.trim();
    const itemValue = itemSpan.textContent.trim();

    return `${itemName} - ${itemValue}`;
}


//Mostra informações de um item no formato "Nome - R$XXXX"
function extrairInfomacoesDeUmItem(texto){
    const regex = /^(.*) - R\$(\d+)/;
    const match = texto.match(regex);

    if (match) {
        const nome = match[1].trim();
        const valor = parseInt(match[2]);

        return {
            Nome: nome,
            Valor: valor
        };
    } else {
        console.error("Este item não apresenta o formato padrão: 'Nome - R$XXXX'")
        return {
            Nome: null,
            Valor: null
        }
    }
}