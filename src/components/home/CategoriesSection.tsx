import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '@/lib/axios';
import type { Category } from '@/types';
import { Loader2 } from 'lucide-react';

const categoryImages: Record<string, string> = {
  beauty: '💄', fragrances: '🌸', furniture: '🛋️', groceries: '🛒',
  'home-decoration': '🏠', 'kitchen-accessories': '🍳', laptops: '💻',
  'mens-shirts': '👔', 'mens-shoes': '👞', 'mens-watches': '⌚',
  'mobile-accessories': '📱', motorcycle: '🏍️', 'skin-care': '🧴',
  smartphones: '📲', 'sports-accessories': '⚽', sunglasses: '🕶️',
  tablets: '📱', tops: '👚', vehicle: '🚗', 'womens-bags': '👜',
  'womens-dresses': '👗', 'womens-jewellery': '💍', 'womens-shoes': '👠',
  'womens-watches': '⌚',
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getCategories().then((res) => {
      setCategories(res.data.slice(0, 8));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <span className="text-4xl">{categoryImages[cat.slug] || '🛍️'}</span>
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary capitalize transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
