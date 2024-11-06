'use client';

// app/[category].js
import { useEffect, useState } from 'react';
import ProductCard from "@/app/components/addon/product-card/page"
import { get } from "@/app/_utils/api"

const CategoryPage = ({ params }) => {

  const [category, setCategory] = useState(null)
  const [products, setProduct] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Access the category directly from params

    const fetchData = async () => {
      try {
        const products = await get(`/products/category/${params.category}`);
        setProduct(products);  // Set the fetched data to state
        setCategory(params.category);  // Set category if needed
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  // Set loading to false once the fetching is done
      }
    };

    fetchData();


    setCategory(params.category)
  }, [params.category]);

  if (loading) return <h1 class="flex flex-wrap p-5 min-h-screen justify-center text-4xl font-extrabold leading-none tracking-tight text-red-500 md:text-5xl lg:text-6xl dark:text-white capitalize">Loading...</h1>;

  return (
    <>
      <h1 class="flex flex-wrap pt-5 justify-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white capitalize">{ params.category.replace(/%20/g, ' ')}</h1>
      <div className="flex flex-wrap justify-center">
        {
          products?.map( item => {
            return(
              <ProductCard key={item.id} product={item} />
            )
          })
        }
      </div>
    </>
  );
};

export default CategoryPage;