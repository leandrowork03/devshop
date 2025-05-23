import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";


export function Header(){
    const {cartAmount}= useContext(CartContext)
    
    return(
        <header className="bg-sky-300 w-full px-1">
            <nav className="flex justify-between items-center h-13 px-4 mx-auto max-w-7xl">
                <Link to='/' className="font-bold">
                DevShop
                </Link>

                <Link to='/cart' className="relative">
                <IoCartOutline size={25}/>

                {cartAmount > 0 && (
                         <span className="absolute text-xs bg-sky-500 text-white px-1.5 rounded-full -right-2 -top-1.5">{cartAmount}</span>
                )}

                </Link>
            </nav>
        </header>
    )
}