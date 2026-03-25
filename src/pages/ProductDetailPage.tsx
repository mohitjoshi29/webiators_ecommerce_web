import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '@/lib/axios';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Loader2, ShoppingCart, Star, ArrowLeft, Minus, Plus, Package } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productAPI.getById(Number(id)).then((res) => {
      setProduct(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
        <p className="text-lg">Product not found</p>
        <Link to="/products" className="text-primary text-sm mt-3 inline-block hover:underline">Back to products</Link>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;
  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl border border-border bg-secondary/30 flex items-center justify-center overflow-hidden">
            <img src={images[selectedImage]} alt={product.title} className="max-w-full max-h-full object-contain p-6" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden shrink-0 ${selectedImage === i ? 'border-primary' : 'border-border'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground capitalize mb-1">{product.category} · {product.brand}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{product.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-warning text-warning' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)} rating</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 5 && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-semibold">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-success" />
            <span className={product.stock > 0 ? 'text-success' : 'text-destructive'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary rounded-l-lg">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary rounded-r-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
