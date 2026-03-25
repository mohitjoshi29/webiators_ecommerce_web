import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
  { icon: RotateCcw, title: 'Easy Returns', description: '30-day return policy' },
  { icon: Shield, title: 'Secure Payments', description: '100% protected' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated support' },
];

const PromoSection = () => (
  <section className="py-16 bg-primary/5">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PromoSection;
