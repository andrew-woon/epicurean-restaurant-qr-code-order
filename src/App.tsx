/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Search, 
  Utensils, 
  ReceiptText, 
  Leaf, 
  Wheat, 
  Info, 
  Bell, 
  Menu as MenuIcon,
  LayoutDashboard,
  Edit3,
  BarChart3,
  Settings,
  LogOut,
  Check,
  ArrowRight,
  Table as TableIcon,
  DollarSign
} from 'lucide-react';
import { cn } from './lib/utils';
import { DISHES, Dish, CartItem as CartItemType } from './types';
import { CartProvider, useCart } from './CartContext';

// --- UI Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-bold font-sans uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variant === 'primary' && "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:opacity-90",
          variant === 'secondary' && "bg-secondary-container text-on-secondary-container hover:opacity-80",
          variant === 'ghost' && "bg-transparent text-primary hover:bg-primary/10",
          size === 'sm' && "px-4 py-2 text-[10px]",
          size === 'md' && "px-6 py-4 text-xs",
          size === 'lg' && "px-8 py-5 text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

const IconButton = ({ icon: Icon, className, ...props }: { icon: any, className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    className={cn("p-2 rounded-full hover:bg-primary/10 transition-colors active:scale-95 duration-200 text-primary", className)}
    {...props}
  >
    <Icon size={20} />
  </button>
);

const Chip = ({ children, icon: Icon, active }: { children: React.ReactNode, icon?: any, active?: boolean, key?: React.Key }) => (
  <span className={cn(
    "px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 transition-all duration-200",
    active ? "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md" : "bg-secondary-container text-on-secondary-container"
  )}>
    {Icon && <Icon size={14} />}
    {children}
  </span>
);

// --- Layout Wrapper ---

const AppLayout = ({ children, showNav = true, isAdmin = false }: { children: React.ReactNode, showNav?: boolean, isAdmin?: boolean }) => {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "h-full w-72 fixed left-0 top-0 border-r-0 bg-white z-40 hidden md:flex flex-col py-8 gap-2",
        isAdmin && "md:flex",
        !isAdmin && "hidden"
      )}>
        <div className="font-serif text-primary mb-8 px-8 text-2xl italic font-bold">
          The Epicurean
        </div>
        
        {isAdmin ? (
          <>
            <div className="px-8 mb-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                <img src="https://picsum.photos/seed/chef/200" alt="Chef" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Chef's Table</h3>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Admin Console</p>
              </div>
            </div>
            <nav className="flex-1">
              <Link to="/admin" className={cn("flex items-center gap-3 py-3 px-8 mr-4 rounded-r-full transition-all", location.pathname === '/admin' ? "bg-primary-fixed text-on-primary-fixed-variant" : "text-on-surface-variant hover:bg-surface-container-low")}>
                <LayoutDashboard size={18} />
                <span className="font-semibold text-sm">Dashboard</span>
              </Link>
              <button className="w-full flex items-center gap-3 py-3 px-8 text-on-surface-variant hover:bg-surface-container-low transition-all hover:pl-10">
                <Edit3 size={18} />
                <span className="font-semibold text-sm">Menu Editor</span>
              </button>
              <button className="w-full flex items-center gap-3 py-3 px-8 text-on-surface-variant hover:bg-surface-container-low transition-all hover:pl-10">
                <BarChart3 size={18} />
                <span className="font-semibold text-sm">Analytics</span>
              </button>
            </nav>
          </>
        ) : (
          <nav className="flex-1">
            <Link to="/" className={cn("flex items-center gap-4 px-8 py-4 hover:pl-10 transition-all", location.pathname === '/' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant")}>
              <Utensils size={20} />
              <span className="font-semibold text-sm">Menu</span>
            </Link>
            <Link to="/cart" className={cn("flex items-center gap-4 px-8 py-4 hover:pl-10 transition-all", location.pathname === '/cart' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant")}>
              <ShoppingBag size={20} />
              <span className="font-semibold text-sm">Cart</span>
            </Link>
            <Link to="/orders" className={cn("flex items-center gap-4 px-8 py-4 hover:pl-10 transition-all", location.pathname === '/orders' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant")}>
              <ReceiptText size={20} />
              <span className="font-semibold text-sm">Orders</span>
            </Link>
          </nav>
        )}

        <div className="mt-auto px-8 py-4">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("pb-32", isAdmin ? "md:ml-72" : "")}>
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      {showNav && !isAdmin && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-md z-50 rounded-t-[1.5rem] shadow-[0_-4px_32px_rgba(26,28,28,0.06)]">
          <Link to="/" className={cn("flex flex-col items-center justify-center px-5 py-2 transition-all", location.pathname === '/' ? "bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl" : "text-on-surface-variant")}>
            <Utensils size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Menu</span>
          </Link>
          <Link to="/cart" className={cn("flex flex-col items-center justify-center px-5 py-2 transition-all", location.pathname === '/cart' ? "bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl" : "text-on-surface-variant")}>
            <ShoppingBag size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Cart</span>
          </Link>
          <Link to="/orders" className={cn("flex flex-col items-center justify-center px-5 py-2 transition-all", location.pathname === '/orders' ? "bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl" : "text-on-surface-variant")}>
            <ReceiptText size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Orders</span>
          </Link>
        </nav>
      )}

      {/* Admin Mobile Nav */}
      {showNav && isAdmin && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-md z-50 rounded-t-[1.5rem] shadow-[0_-4px_32px_rgba(26,28,28,0.06)]">
          <Link to="/admin" className={cn("flex flex-col items-center justify-center px-5 py-2 transition-all", location.pathname === '/admin' ? "bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl" : "text-on-surface-variant")}>
            <LayoutDashboard size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Dashboard</span>
          </Link>
          <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2">
            <Edit3 size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Menu</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2">
            <BarChart3 size={20} />
            <span className="font-medium text-[10px] uppercase tracking-wider mt-1">Sales</span>
          </button>
        </nav>
      )}

      {/* Floating Cart Bar (Menu Screen Only) */}
      {location.pathname === '/' && totalItems > 0 && (
        <div className="fixed bottom-24 left-0 w-full px-6 z-40 md:left-auto md:right-6 md:w-96">
          <motion.button 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => navigate('/cart')}
            className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl flex items-center justify-between px-6 floating-cart-shadow active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold">{totalItems}</div>
              <span className="font-bold text-lg font-sans uppercase tracking-widest">View Cart</span>
            </div>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

// --- Screens ---

const MenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Menu');
  const categories = ['All Menu', 'Starters', 'Mains', 'Desserts', 'Drinks'];
  const navigate = useNavigate();

  const filteredDishes = activeCategory === 'All Menu' 
    ? DISHES 
    : DISHES.filter(d => d.category === activeCategory);

  return (
    <AppLayout>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm shadow-on-surface/5">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary" size={24} />
            <h1 className="font-serif italic text-primary text-2xl">The Epicurean</h1>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <div className="mt-20 px-6">
        {/* Hero Section */}
        <section className="py-8 flex flex-col md:flex-row md:items-center gap-8 overflow-hidden">
          <div className="relative w-full md:w-1/2">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl -z-10"></div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-on-surface leading-tight tracking-tight">
              Seasonal <br /> <span className="text-primary">Indulgence</span>
            </h2>
            <p className="mt-4 text-on-surface-variant font-sans text-lg max-w-xs">
              Artisanally crafted flavors, delivered from our hearth to your table.
            </p>
          </div>
          <div className="relative w-full md:w-1/2 flex justify-end">
            <motion.img 
              initial={{ rotate: 0 }}
              animate={{ rotate: 3 }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpApyZLCEAXl-5hECLRYW4lOXUTU2QmemZpXyMYtZ73RDTfhT7z-wkaimi0Aqn2a_sbv-RvVu1Vsv9XwMxbbDFFyYXu9k4xK5Q9ctJyjAn39ETGqWm45fsxldBH1ivvcVJ7OJjteRkjwPKn6vGaCn3j4s13jLTw9yufPiiD_1gf8EprWMmP7_adyDzISdOS_F8ib29W2vfgP9y88BRLqcziefyD3QStCKkKmrrzVMxbEKrXDpjhUbea_Y4EyTpS-Pz-pMX6Kx94Ybj" 
              alt="Signature Dish" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white"
            />
          </div>
        </section>

        {/* Search */}
        <section className="mt-8 mb-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-outline" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Cravings? Search our menu..."
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 focus:bg-primary-fixed/10 transition-all text-on-surface placeholder:text-outline"
            />
          </div>
        </section>

        {/* Filters */}
        <section className="mb-10 overflow-x-auto no-scrollbar flex items-center gap-3 py-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-full font-semibold tracking-wide transition-all active:scale-95 duration-200",
                activeCategory === cat 
                  ? "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md" 
                  : "bg-secondary-container text-on-secondary-container hover:opacity-80"
              )}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Food List */}
        <section className="space-y-10">
          <h3 className="font-serif text-2xl font-bold mb-4">From the Hearth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDishes.map(dish => (
              <motion.div 
                layout
                key={dish.id}
                onClick={() => !dish.isSoldOut && navigate(`/dish/${dish.id}`)}
                className={cn(
                  "group flex items-center gap-6 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer",
                  dish.isSoldOut ? "bg-surface-container-low opacity-60 grayscale" : "bg-white"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img src={dish.image} alt={dish.name} className="w-24 h-24 object-cover rounded-lg shadow-inner" />
                  {dish.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-on-surface/90 text-white px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg text-on-surface">{dish.name}</h4>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">{dish.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className={cn("font-bold text-lg", dish.isSoldOut ? "text-on-surface-variant" : "text-primary")}>
                      ${dish.price.toFixed(2)}
                    </span>
                    {!dish.isSoldOut && (
                      <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors active:scale-90">
                        <Plus size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dish = DISHES.find(d => d.id === id);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customizations, setCustomizations] = useState<string[]>([]);

  if (!dish) return <div>Dish not found</div>;

  const toggleCustomization = (option: string) => {
    setCustomizations(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleAdd = () => {
    addToCart(dish, quantity, customizations, specialInstructions);
    navigate('/');
  };

  return (
    <AppLayout showNav={false}>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <IconButton icon={ArrowLeft} onClick={() => navigate(-1)} />
          <span className="font-serif italic text-primary text-2xl">The Epicurean</span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton icon={Heart} />
          <IconButton icon={Share2} />
        </div>
      </header>

      <section className="relative w-full h-[397px] lg:h-[486px] overflow-hidden bg-surface-container-low flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white p-8 xl:rounded-xl editorial-shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
            <div>
              <span className="font-sans text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">Signature Entrée</span>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-on-surface leading-tight">{dish.name}</h1>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-on-surface-variant text-lg">$</span>
              <span className="text-primary font-serif font-bold text-4xl italic">{dish.price.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-2xl">
            {dish.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {dish.dietary?.map(d => (
              <Chip key={d} icon={d === 'Vegetarian' ? Leaf : Wheat}>{d}</Chip>
            ))}
          </div>

          <hr className="border-outline-variant/10 mb-10" />

          <div className="space-y-12">
            <section>
              <h3 className="font-serif text-2xl font-bold text-on-surface mb-6 italic">Tailor Your Palette</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['No Onions', 'Extra Vinaigrette'].map(option => (
                  <label 
                    key={option}
                    className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl cursor-pointer hover:bg-primary-fixed/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                        customizations.includes(option) ? "border-primary bg-primary" : "border-outline group-hover:border-primary"
                      )}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={customizations.includes(option)}
                          onChange={() => toggleCustomization(option)}
                        />
                        {customizations.includes(option) && <Check size={16} className="text-white" />}
                      </div>
                      <span className="font-semibold text-on-surface">{option}</span>
                    </div>
                    <span className="text-on-surface-variant text-sm">{option === 'No Onions' ? 'Free' : '+$0.50'}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h4 className="text-xs uppercase tracking-widest text-on-surface-variant mb-4 font-bold">Quantity</h4>
                <div className="flex items-center bg-surface-container p-1 rounded-2xl w-fit">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors active:scale-90"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center font-serif font-bold text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors active:scale-90"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-xs uppercase tracking-widest text-on-surface-variant mb-4 font-bold">Special Instructions</h4>
                <textarea 
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-surface-container border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/20 ring-inset placeholder:text-on-surface-variant/40 min-h-[100px]" 
                  placeholder="Add a note for the kitchen..."
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pt-4 bg-white/90 backdrop-blur-xl flex justify-center items-center shadow-[0_-4px_32px_rgba(26,28,28,0.08)]">
        <div className="max-w-3xl w-full flex items-center gap-6">
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] uppercase text-on-surface-variant font-bold tracking-widest">Total Estimate</span>
            <span className="font-serif font-bold text-2xl text-on-surface">${(dish.price * quantity).toFixed(2)}</span>
          </div>
          <Button onClick={handleAdd} className="flex-1 py-5 gap-3">
            Add to Order
            <ShoppingBag size={20} />
          </Button>
        </div>
      </footer>
    </AppLayout>
  );
};

const CartScreen = () => {
  const { cart, updateQuantity, totalPrice, placeOrder } = useCart();
  const navigate = useNavigate();
  const subtotal = totalPrice;
  const serviceFee = subtotal * 0.15;
  const gst = subtotal * 0.05;
  const total = subtotal + serviceFee + gst;

  const handlePlaceOrder = () => {
    placeOrder();
    navigate('/orders');
  };

  return (
    <AppLayout showNav={true}>
      <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm shadow-on-surface/5">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary" size={24} />
            <span className="font-serif italic text-primary text-2xl">The Epicurean</span>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-on-surface mb-2 font-serif">Review Order</h1>
          <p className="text-on-surface-variant font-sans">Refining your culinary selection</p>
        </section>

        <div className="space-y-8 mb-12">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-on-surface-variant mb-6">Your cart is empty</p>
              <Button onClick={() => navigate('/')}>Browse Menu</Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-start gap-4 p-4 bg-white rounded-xl group transition-all duration-300">
                <div className="relative shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-on-surface">{item.name}</h3>
                    <span className="font-sans font-semibold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">{item.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-surface-container rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
                <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Location</label>
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <TableIcon className="text-primary" size={20} />
                  <div>
                    <span className="block text-xs text-on-surface-variant">Table Number</span>
                    <span className="text-lg font-bold">Twelve</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant italic">Verified via QR entry.</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Special Instructions</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 min-h-[120px] font-sans text-sm placeholder:text-on-surface-variant/50" 
                  placeholder="E.g. No pine nuts on the burrata please..."
                />
              </div>
            </section>

            <section className="bg-surface-container p-8 rounded-2xl mb-12">
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Service Fee (15%)</span>
                  <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>GST</span>
                  <span className="font-semibold">${gst.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-xl font-serif font-bold">Total</span>
                  <span className="text-2xl font-serif font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md px-6 py-6 z-50">
              <div className="max-w-2xl mx-auto">
                <Button onClick={handlePlaceOrder} className="w-full py-5 gap-3">
                  <span>Place Order</span>
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </AppLayout>
  );
};

const OrdersScreen = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm shadow-on-surface/5">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary" size={24} />
            <span className="font-serif italic text-primary text-2xl">The Epicurean</span>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-on-surface mb-2 font-serif">Your Orders</h1>
          <p className="text-on-surface-variant font-sans">Tracking your culinary journey</p>
        </section>

        <div className="space-y-8 mb-12">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-on-surface-variant mb-6">You haven't placed any orders yet</p>
              <Button onClick={() => navigate('/')}>Browse Menu</Button>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 editorial-shadow space-y-6">
                <div className="flex justify-between items-start border-b border-outline-variant/10 pb-4">
                  <div>
                    <h3 className="font-bold text-lg text-on-surface">Order #{order.id}</h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">
                      {order.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {order.items.length} Items
                    </p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    order.status === 'Pending' ? "bg-primary/10 text-primary" : "bg-secondary-container text-on-secondary-container"
                  )}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary text-sm">{item.quantity}x</span>
                        <span className="text-sm font-medium text-on-surface">{item.name}</span>
                      </div>
                      <span className="text-sm text-on-surface-variant">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-serif font-bold text-xl text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </AppLayout>
  );
};

const AdminDashboard = () => {
  return (
    <AppLayout isAdmin={true}>
      <header className="flex justify-between items-center px-6 py-6 w-full bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <h1 className="font-serif font-bold text-2xl text-on-surface">Service Overview</h1>
          <p className="font-sans text-sm text-on-surface-variant">Live metrics for Tonight's Service</p>
        </div>
        <div className="flex items-center gap-4">
          <IconButton icon={Bell} />
          <div className="md:hidden">
            <MenuIcon className="text-on-surface" />
          </div>
        </div>
      </header>

      <section className="px-6 py-8">
        {/* Bento Grid Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-8 rounded-[1.5rem] text-on-primary shadow-xl shadow-primary/10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <ShoppingBag className="text-4xl opacity-50" size={32} />
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">+12% vs last week</span>
            </div>
            <div>
              <h4 className="font-sans text-sm opacity-80 uppercase tracking-widest mb-1">Active Orders</h4>
              <div className="font-serif text-6xl font-bold">24</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <DollarSign className="text-primary" size={24} />
              <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-sans text-sm text-on-surface-variant mb-1">Total Sales</h4>
              <div className="font-serif text-3xl font-bold text-on-surface">$4,820.50</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <TableIcon className="text-primary" size={24} />
              <span className="text-xs font-bold text-error">3 Pending</span>
            </div>
            <div>
              <h4 className="font-sans text-sm text-on-surface-variant mb-1">Table Status</h4>
              <div className="font-serif text-3xl font-bold text-on-surface">18/25 <span className="text-sm font-normal opacity-50">Occupied</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-on-surface">Live Table Map</h2>
              <div className="flex gap-2">
                <Chip active>Main Hall</Chip>
                <Chip>Terrace</Chip>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-[2rem] p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ad2c00 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={cn(
                    "w-20 h-20 rounded-xl flex items-center justify-center font-bold shadow-lg cursor-pointer transition-all active:scale-90",
                    i === 3 ? "bg-white border border-outline-variant/30 text-on-surface-variant" : "bg-primary text-white shadow-primary/20"
                  )}>T{i}</div>
                ))}
                {[5, 6, 7, 8].map(i => (
                  <div key={i} className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer transition-all active:scale-90",
                    [5, 8].includes(i) ? "bg-white border border-outline-variant/30 text-on-surface-variant" : "bg-primary text-white shadow-primary/20"
                  )}>T{i}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-on-surface">Inventory Toggle</h2>
              <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden p-2">
              <div className="divide-y divide-surface-container">
                {DISHES.slice(0, 4).map(dish => (
                  <div key={dish.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-xl overflow-hidden", dish.isSoldOut && "grayscale")}>
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{dish.name}</h4>
                        <p className={cn("text-[10px] uppercase tracking-tighter", dish.isSoldOut ? "text-error" : "text-on-surface-variant")}>
                          {dish.isSoldOut ? "Sold Out" : dish.category}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={!dish.isSoldOut} />
                      <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-surface-container-low rounded-b-[2rem] mt-2">
                <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                  <Info size={14} />
                  <span>Toggling items updates the customer menu instantly.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

// --- App Entry ---

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/dish/:id" element={<ProductDetailScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
