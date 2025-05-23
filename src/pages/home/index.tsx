import { BiSolidCartAdd } from "react-icons/bi";
import { api } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export interface ProductProps{
    id:number,
    title:string,
    description:string,
    price:number,
    cover:string,
}


export function Home(){
    const [products, setProducts]= useState<ProductProps[]>([])
    const {addItem} = useContext(CartContext)

    useEffect(()=>{
        async function getProducts(){
        const response = await api.get("/products")
        setProducts(response.data)
        }
        getProducts()
    },[])

    function adicionar(item:ProductProps){
        toast.success('produto adicionado ao carrinho!')
        addItem(item)
    }
    
    return(
        <div>
            <h1 className="text-2xl font-bold p-5 text-center">Produtos</h1>

            <main className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 max-w-7xl gap-4 mx-auto">
               
              {products.map((item)=>(
                  <section className="p-4" key={item.id}>

                 <Link to={`/produts/${item.id}`}>
                    <img src={item.cover} alt={item.title} className="w-full h-50 object-contain"/>
                    
                    <strong>{item.title}</strong>
                     </Link>


                    <div className="flex gap-4">
                        <p>Preço: R${item.price.toLocaleString("PT-BR",{
                            style:'currency',
                            currency:'BRL'
                        })}</p>

                        <button onClick={()=>adicionar(item)}>
                            <BiSolidCartAdd size={25}/>
                        </button>
                    </div>
                </section>
              ))}

            </main>
        </div>
    )
}