import { useContext, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
	ADD_PRODUTO,
	REMOVE_PRODUTO,
	UPDATE_QUANTIDADE,
} from "@/reducers/carrinhoReducer";

const addProdutoAction = novoProduto => ({
	type: ADD_PRODUTO,
	payload: novoProduto,
});

const removeProdutoAction = produtoId => ({
	type: REMOVE_PRODUTO,
	payload: produtoId,
});

const updateQuantidadeAction = (produtoId, quantidade) => ({
	type: UPDATE_QUANTIDADE,
	payload: { produtoId, quantidade },
});

export const useCarrinhoContext = () => {
	const { carrinho, dispatch, quantidade, valorTotal } =
		useContext(CarrinhoContext);
};

function adicionarProduto(novoProduto) {
	dispatch(addProdutoAction(novoProduto));
}

function removerProduto(id) {
	const produto = carrinho.find(item => item.id === id);

	if (produto && produto.quantidade > 1) {
		dispatch(updateQuantidadeAction(id, produto.quantidade - 1));
	} else {
		dispatch(removeProdutoAction(id));
	}
}

function removerProdutoCarrinho(id) {
	dispatch(removeProdutoAction(id));
}

const { totalTemp, quantidadeTemp } = useMemo(() => {
	return carrinho.reduce(
		() => (acumulador, produto) => ({
			quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
			totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
		}),
		{
			quantidadeTemp: 0,
			totalTemp: 0,
		}
	);
}, [carrinho]);

useEffect(() => {
	setQuantidade(quantidadeTemp);
	setValorTotal(totalTemp);
});

return {
	carrinho,
	adicionarProduto,
	removerProduto,
	removerProdutoCarrinho,
	valorTotal,
	quantidade,
};
