import Image from "next/image";
import ProductCard from "@/app/components/addon/product-card/page"
import { get } from "@/app/_utils/api"
import Cart from "./cart/page";


const Home = async () => {
  const products = await get('/products')
  return (
      <>
      <div className="flex flex-wrap justify-center">
        {
          products?.map( item => {
            return(
              <ProductCard key={item.id} product={item} />
            )
          })
        }a
      </div>
      </>
  );
}

export default Home