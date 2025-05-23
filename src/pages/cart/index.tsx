import { useContext } from "react"
import { CartContext } from "../../contexts/cartContext"
import type { ProductProps } from "../home"
import { Link } from "react-router-dom"

export function Cart(){
    const {addItem, cart, removeItem, total} = useContext(CartContext)
    
    function adicionar(item: ProductProps){
        addItem(item)
    }

    function remover(item:ProductProps){
        removeItem(item)
    }

    return(
        <div>
            {cart.length >0 ? (
                <div>
                    <h1 className="text-2xl font-bold text-center p-5">Carrinho</h1>
                </div>
            ):(
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold p-5">Seu carrinho está vázio</h1>

                    <p className="p-5">Adicione produtos ao seu carrinho!</p>

                    <Link to='/' className="bg-zinc-500 text-white p-3 rounded">Adicionar Produtos</Link>
                </div>
            )}

            <main className="px-4 max-w-7xl mx-auto">

                {cart.map((item)=>(
                    <section className="flex items-center justify-between w-full mx-auto" key={item.id}>
                  <div className="flex items-center gap-10">

                     <Link to={`/produts/${item.id}`}>
                      <img src={item.cover} alt={item.title} className="w-50"/>
                     </Link>

                    <div>
                       <Link to={`/produts/${item.id}`}>
                        <strong>{item.title}</strong>
                       </Link>

                        <p>Price: R${item.price.toLocaleString("PT-BR",{
                            style:"currency",
                            currency:"BRL"
                        })}</p>
                        
                        <strong>Subtotal: R${item.total.toLocaleString("PT-BR",{
                            style:'currency',
                            currency:"BRL"
                        })}</strong>
                    </div>
                  </div>

                    <div className="flex gap-2">
                        <button className="bg-zinc-700 text-white px-2" onClick={()=>remover(item)}>-</button>

                        {item.amount}

                        <button className="bg-zinc-700 text-white px-2" onClick={()=>adicionar(item)}>+</button>
                    </div>
                </section>
                ))}

                {total > 0 && (
                    <div>
                        <strong>Total: R${total.toLocaleString("PT-BR",{
                            style:"currency",
                            currency:"BRL"
                        })}</strong>
                    </div>
                )}
                
            </main>
        </div>
    )
}