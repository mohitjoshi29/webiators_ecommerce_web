import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-secondary/50">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-56 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 5 && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-semibold">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 5 && (
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
