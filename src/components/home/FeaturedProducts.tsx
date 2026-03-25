import { useEffect, useState } from 'react';
import { productAPI } from '@/lib/axios';
import type { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll(8, 0).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Handpicked just for you</p>
          </div>
          <Link to="/products" className="text-primary font-medium text-sm hover:underline hidden sm:block">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="sm:hidden text-center mt-6">
          <Link to="/products" className="text-primary font-medium text-sm hover:underline">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
