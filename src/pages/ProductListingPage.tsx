import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '@/lib/axios';
import type { Product, Category } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Loader2, Search, SlidersHorizontal, X } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  useEffect(() => {
    productAPI.getCategories().then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let request;
    if (search) {
      request = productAPI.search(search);
    } else if (category) {
      request = productAPI.getByCategory(category);
    } else {
      request = productAPI.getAll(100, 0);
    }

    request.then((res) => {
      setAllProducts(res.data.products);
      setTotal(res.data.total);
      setLoading(false);
      setPage(1);
    }).catch(() => setLoading(false));
  }, [searchParams]);

  // Filter by price
  const filtered = useMemo(() => {
    return allProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
  }, [allProducts, priceRange]);

  // Paginate
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (searchInput.trim()) params.search = searchInput.trim();
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params: Record<string, string> = {};
    if (cat) params.category = cat;
    if (searchInput.trim()) params.search = searchInput.trim();
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {searchParams.get('search') ? `Results for "${searchParams.get('search')}"` : selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name || 'Products' : 'All Products'}
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-40 bg-background p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 shrink-0 space-y-6`}>
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </form>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              <button
                onClick={() => handleCategoryChange('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${selectedCategory === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Min"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Max"
              />
            </div>
          </div>

          <button onClick={clearFilters} className="w-full py-2 text-sm text-destructive hover:underline">
            Clear All Filters
          </button>

          <button onClick={() => setShowFilters(false)} className="lg:hidden w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold mt-4">
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No products found</p>
              <button onClick={clearFilters} className="mt-3 text-primary text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === pageNum ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-secondary'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && <span className="flex items-center text-muted-foreground">...</span>}
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
