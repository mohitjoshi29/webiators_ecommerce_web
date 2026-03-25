import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-bold text-foreground">404</h1>
    <p className="text-muted-foreground mt-2 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
      Go Home
    </Link>
  </div>
);

export default NotFound;
