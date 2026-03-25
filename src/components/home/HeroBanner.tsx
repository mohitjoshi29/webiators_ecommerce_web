import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
    <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🔥 New Arrivals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Discover Your <span className="text-primary">Perfect Style</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
            Shop the latest trends with unbeatable prices. Free shipping on orders over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?view=categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
              <img
                src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
                alt="Featured product"
                className="w-48 h-48 object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroBanner;
