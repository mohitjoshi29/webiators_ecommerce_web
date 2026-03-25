import { Link } from 'react-router-dom';

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
  ],
  Support: [
    { label: 'Contact', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Shipping', path: '/shipping' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Refund Policy', path: '/refund' },
  ],
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold">Webiators</span>
          </div>
          <p className="text-background/60 text-sm leading-relaxed">
            Empowering Ecommerce with quality products and seamless shopping experiences.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link groups */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-background/10 mt-10 pt-6 text-center">
        <p className="text-background/40 text-sm">
          © {new Date().getFullYear()} Webiators. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
