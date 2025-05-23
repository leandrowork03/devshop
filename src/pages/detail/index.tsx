import { BiSolidCartAdd } from "react-icons/bi";
import type { ProductProps } from "../home";
import { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { CartContext } from "../../contexts/cartContext";
import toast from "react-hot-toast";

export function Detail(){
    const [product, setProduct] = useState<ProductProps>()
    const {id} =useParams()
    const{addItem} = useContext(CartContext)
    const navigate= useNavigate()

  useEffect(() => {
    async function getProduct(){
      const response = await api.get(`/products/${id}`)
      setProduct(response.data);
    }

    getProduct();
  }, [id])

  function adicionar(product: ProductProps){
    toast.success('Produto adicionado ao carrinho!')
    navigate('/cart')
    addItem(product)
  }

    return(
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto my-6">
               
            {product && (
                 <section className="w-full">
                   <div className="flex flex-col lg:flex-row">
                     <img src={product?.cover} alt={product.title} className="flex-1 w-full max-h-72 object-contain"/>

                   <div className="flex-1 my-auto">
                     <strong>{product?.title}</strong>

                    <p className="pt-9">{product?.description}</p>

                    <div className="flex items-center gap-3 mt-5">
                        <strong>Preço: R${product.price}</strong>

                        <button onClick={()=>adicionar(product)}>
                            <BiSolidCartAdd size={25}/>
                        </button>
                    </div>
                   </div>
                   </div>
                </section>
            )}

            </main>
        </div>
    )
}