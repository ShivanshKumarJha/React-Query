import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

function Product() {
  const { productId } = useParams();

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };

  // Mutations
  const mutation = useMutation({
    mutationFn: newProduct => {
      return axios.put(
        `https://dummyjson.com/products/products/${productId}`,
        newProduct
      );
    },
  });

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h3 className="text-red-600">Error: {error.message}</h3>;
  }

  if (mutation.isLoading) {
    return <Loader />;
  }

  if (mutation.isError) {
    return <h3 className="text-red-600">Error while updating: {mutation.error.message}</h3>;
  }

  return (
    <>
      <div>Product : {product.title}</div>

      <button
        onClick={() => {
          mutation.mutate({ title: 'Updated product' });
        }}
      >
        Create product
      </button>
    </>
  );
}

export default Product;
