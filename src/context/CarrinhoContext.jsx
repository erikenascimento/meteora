import { createContext, useReducer, useState } from "react";
import { carrinhoReducer } from "@/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

export const CarrinhoProvider = ({ children }) => {
	const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
	const [quantidade, setQuantidade] = useState(0);
	const [valorTotal, setValorTotal] = useState(0);

	const produto = carrinho.find(item => item.id === id);

	if (produto && produto.quantidade > 1) {
		dispatch(updateQuantidadeAction(id, produto.quantidade - 1));
	} else {
		dispatch(removeProdutoAction(id));
	}

	return (
		<CarrinhoContext.Provider
			value={(carrinho, dispatch, quantidade, valorTotal)}
		>
			{children}
		</CarrinhoContext.Provider>
	);
};
