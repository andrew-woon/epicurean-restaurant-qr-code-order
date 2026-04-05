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
  DollarSign,
  QrCode,
  Scan,
  Sparkles
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
      {showNav && (
        <aside className={cn(
          "h-full w-72 fixed left-0 top-0 border-r border-outline-variant/10 bg-white z-40 hidden md:flex flex-col py-8 gap-2",
        )}>
          <div className="font-serif text-primary mb-8 px-8 text-2xl italic font-bold">
            Kopitiam 1924
          </div>
          
          {isAdmin ? (
            <>
              <div className="px-8 mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                  <img src="https://picsum.photos/seed/chef/200" alt="Chef" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                <button className="w-full flex items-center gap-3 py-3 px-8 text-on-surface-variant hover:bg-surface-container-low transition-all hover:pl-10">
                  <Settings size={18} />
                  <span className="font-semibold text-sm">Settings</span>
                </button>
              </nav>
            </>
          ) : (
            <nav className="flex-1">
              <Link to="/" className={cn("flex items-center gap-4 px-8 py-4 transition-all", location.pathname === '/' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant hover:bg-surface-container-low hover:pl-10")}>
                <Utensils size={20} />
                <span className="font-semibold text-sm">Menu</span>
              </Link>
              <Link to="/cart" className={cn("flex items-center gap-4 px-8 py-4 transition-all", location.pathname === '/cart' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant hover:bg-surface-container-low hover:pl-10")}>
                <ShoppingBag size={20} />
                <span className="font-semibold text-sm">Cart</span>
              </Link>
              <Link to="/orders" className={cn("flex items-center gap-4 px-8 py-4 transition-all", location.pathname === '/orders' ? "bg-primary-fixed text-on-primary-fixed-variant rounded-r-full mr-4" : "text-on-surface-variant hover:bg-surface-container-low hover:pl-10")}>
                <ReceiptText size={20} />
                <span className="font-semibold text-sm">Orders</span>
              </Link>
            </nav>
          )}
        </aside>
      )}

      {/* Main Content */}
      <main className={cn(
        "pb-32 transition-all duration-300", 
        showNav ? "md:ml-72" : "md:ml-0"
      )}>
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

const ScanScreen = ({ onScan }: { onScan: (table: string) => void }) => {
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      onScan('Twelve');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#1a1c1c] flex flex-col items-center justify-start pt-12 md:pt-20 p-6 overflow-y-auto">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10"></div>
      </div>

      <motion.div 
        initial={{ y: 100, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md perspective-1000 shrink-0"
      >
        {/* The Bill Presenter (Leather Clip Thingy) */}
        <div className="relative bg-[#2a2d2d] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden p-1">
          {/* Leather Texture Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>
          
          {/* Inner Content Area */}
          <div className="relative bg-[#1a1c1c] rounded-[2.2rem] p-8 flex flex-col items-center text-center">
            {/* Gold Clip at the top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-gradient-to-b from-[#d4af37] to-[#aa8a2e] rounded-b-2xl shadow-lg flex items-center justify-center border-x border-b border-white/20">
              <div className="w-24 h-1 bg-white/20 rounded-full"></div>
            </div>

            <div className="mt-12 mb-8">
              <div className="font-serif italic text-[#d4af37] text-3xl font-bold mb-2 tracking-tight">Kopitiam 1924</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Traditional Flavors • Local Heritage</div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

            <div className="relative group cursor-pointer" onClick={simulateScan}>
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div 
                    key="scanning"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="text-primary animate-pulse" size={32} />
                      </div>
                    </div>
                    <p className="mt-6 text-white font-bold uppercase tracking-widest text-xs animate-pulse">Authenticating Table...</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="qr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    {/* QR Code Container */}
                    <div className="relative p-6 bg-white rounded-3xl shadow-inner mb-8 group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl animate-pulse"></div>
                      <QrCode size={160} className="text-[#1a1c1c] relative z-10" strokeWidth={1.5} />
                      
                      {/* Scanning Line Animation */}
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 w-full h-0.5 bg-primary/50 shadow-[0_0_15px_rgba(173,44,0,0.5)] z-20"
                      />
                    </div>

                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-3 text-white/80">
                        <Scan size={18} className="text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest">Tap to Scan QR Code</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-16 text-white/30 text-[10px] uppercase tracking-widest font-bold">
              Table Twelve • Main Dining Room
            </div>
          </div>
        </div>

        {/* Shadow under the presenter */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/40 blur-2xl -z-10 rounded-full"></div>
      </motion.div>

      {/* Instructions Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 md:mt-24 text-center relative z-10 shrink-0 pb-12"
      >
        <p className="text-white/40 text-xs font-medium tracking-wide">
          Welcome to <span className="text-white">Kopitiam 1924</span>.<br />
          Please scan the QR code on your table to start ordering.
        </p>
      </motion.div>
    </div>
  );
};

const MenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Menu');
  const categories = ['All Menu', 'Toast & Eggs', 'Main Course', 'Small Bites', 'Beverages'];
  const navigate = useNavigate();

  const filteredDishes = activeCategory === 'All Menu' 
    ? DISHES 
    : DISHES.filter(d => d.category === activeCategory);

  return (
    <AppLayout>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm shadow-on-surface/5 md:left-72 md:w-[calc(100%-18rem)]">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary md:hidden" size={24} />
            <h1 className="font-serif italic text-primary text-2xl">Kopitiam 1924</h1>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <div className="mt-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-8 flex flex-col lg:flex-row lg:items-center gap-12 overflow-hidden">
          <div className="relative w-full lg:w-1/2">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-on-surface leading-tight tracking-tight"
            >
              Taste of <br /> <span className="text-primary">Heritage</span>
            </motion.h2>
            <p className="mt-6 text-on-surface-variant font-sans text-lg md:text-xl max-w-md leading-relaxed">
              Serving authentic local delights since 1924. From charcoal-grilled toast to our signature pulled tea.
            </p>
          </div>
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.img 
                animate={{ rotate: [0, 3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                src="https://images.shutterstock.com/image-vector/hand-drawn-sketch-traditional-coffee-600w-2144363311.jpg" 
                alt="Traditional Kopitiam Cup" 
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] object-cover object-top rounded-full border-4 border-white relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mt-12 mb-10">
          <section className="flex-1">
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

          <section className="overflow-x-auto no-scrollbar flex items-center gap-3 py-2">
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
        </div>

        {/* Food List */}
        <section className="space-y-10">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 md:mb-8">From the Hearth</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {filteredDishes.map(dish => (
              <motion.div 
                layout
                key={dish.id}
                onClick={() => !dish.isSoldOut && navigate(`/dish/${dish.id}`)}
                className={cn(
                  "group flex flex-col p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/10",
                  dish.isSoldOut ? "bg-surface-container-low opacity-60 grayscale" : "bg-white"
                )}
              >
                <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg md:rounded-xl">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  {dish.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-on-surface/20">
                      <span className="bg-on-surface/90 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[8px] md:text-xs font-bold tracking-widest uppercase">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col">
                  <h4 className="font-bold text-sm md:text-lg text-on-surface group-hover:text-primary transition-colors line-clamp-1">{dish.name}</h4>
                  <p className="text-[10px] md:text-sm text-on-surface-variant line-clamp-1 md:line-clamp-2 mt-1 md:mt-2 leading-relaxed">{dish.description}</p>
                  <div className="flex justify-between items-center mt-auto pt-2 md:pt-4">
                    <span className={cn("font-bold text-base md:text-xl", dish.isSoldOut ? "text-on-surface-variant" : "text-primary")}>
                      ${dish.price.toFixed(2)}
                    </span>
                    {!dish.isSoldOut && (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-all active:scale-90 shadow-md shadow-primary/20">
                        <Plus size={16} className="md:hidden" />
                        <Plus size={20} className="hidden md:block" />
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
          <span className="font-serif italic text-primary text-2xl">Kopitiam 1924</span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton icon={Heart} />
          <IconButton icon={Share2} />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <section className="relative w-full lg:w-[45%] h-[397px] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-surface-container-low flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r"></div>
          </div>
        </section>

        <div className="flex-1 px-6 py-12 lg:px-12 lg:py-20 flex justify-center">
          <div className="bg-white p-4 md:p-6 xl:rounded-3xl editorial-shadow lg:shadow-none lg:p-0 max-w-2xl w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
              <div>
                <span className="font-sans text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">Kopitiam Special</span>
                <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-on-surface leading-tight">{dish.name}</h1>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-on-surface-variant text-lg">$</span>
                <span className="text-primary font-serif font-bold text-3xl md:text-4xl lg:text-5xl italic">{dish.price.toFixed(2)}</span>
              </div>
            </div>
            
            <p className="text-on-surface-variant text-base md:text-lg lg:text-xl leading-relaxed mb-10">
              {dish.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {dish.dietary?.map(d => (
                <Chip key={d} icon={d === 'Vegetarian' ? Leaf : Wheat}>{d}</Chip>
              ))}
            </div>

            <hr className="border-outline-variant/10 mb-12" />

            <div className="space-y-16">
              <section>
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-on-surface mb-6 md:mb-8 italic">Customize Your Order</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {['Less Sugar', 'No Ice', 'Extra Butter', 'More Spicy'].map(option => (
                    <label 
                      key={option}
                      className="flex items-center justify-between p-3 md:p-4 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-primary-fixed/20 transition-all group"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={cn(
                          "w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                          customizations.includes(option) ? "border-primary bg-primary" : "border-outline group-hover:border-primary"
                        )}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={customizations.includes(option)}
                            onChange={() => toggleCustomization(option)}
                          />
                          {customizations.includes(option) && <Check size={14} className="text-white" />}
                        </div>
                        <span className="font-semibold text-on-surface text-base md:text-lg">{option}</span>
                      </div>
                      <span className="text-on-surface-variant text-xs md:text-sm font-medium">Free</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant mb-4 md:mb-6 font-bold">Quantity</h4>
                  <div className="flex items-center bg-surface-container p-1 rounded-3xl w-fit">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:text-primary transition-all active:scale-90"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-12 md:w-20 text-center font-serif font-bold text-xl md:text-2xl">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:text-primary transition-all active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant mb-4 md:mb-6 font-bold">Special Instructions</h4>
                  <textarea 
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-surface-container border-none rounded-2xl p-4 md:p-6 text-on-surface focus:ring-2 focus:ring-primary/20 ring-inset placeholder:text-on-surface-variant/40 min-h-[100px] md:min-h-[120px] transition-all text-sm" 
                    placeholder="Add a note for the kitchen..."
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pt-4 bg-white/90 backdrop-blur-xl flex justify-center items-center shadow-[0_-4px_32px_rgba(26,28,28,0.08)]">
        <div className="max-w-4xl w-full flex items-center gap-8">
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] uppercase text-on-surface-variant font-bold tracking-widest">Total Estimate</span>
            <span className="font-serif font-bold text-3xl text-on-surface">${(dish.price * quantity).toFixed(2)}</span>
          </div>
          <Button onClick={handleAdd} className="flex-1 py-4 gap-3 text-lg">
            Add to Order
            <ShoppingBag size={24} />
          </Button>
        </div>
      </footer>
    </AppLayout>
  );
};

const CartScreen = ({ tableNumber = 'Twelve' }: { tableNumber?: string }) => {
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
      <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm shadow-on-surface/5 md:left-72 md:w-[calc(100%-18rem)]">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary md:hidden" size={24} />
            <span className="font-serif italic text-primary text-2xl">Kopitiam 1924</span>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-3 font-serif">Review Order</h1>
          <p className="text-on-surface-variant font-sans text-base md:text-lg">Authentic flavors, ready for your table</p>
        </section>

        <div className="flex flex-col xl:flex-row gap-12 mb-12">
          <div className="flex-1 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl editorial-shadow">
                <p className="text-on-surface-variant mb-8 text-lg">Your cart is empty</p>
                <Button onClick={() => navigate('/')} size="lg">Browse Menu</Button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-6 bg-white rounded-2xl group transition-all duration-300 editorial-shadow border border-outline-variant/5">
                  <div className="relative shrink-0">
                    <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-xl shadow-sm" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-on-surface">{item.name}</h3>
                      <span className="font-sans font-bold text-primary text-lg">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-surface-container rounded-2xl p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors bg-white rounded-xl shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-5 font-bold text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors bg-white rounded-xl shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="w-full xl:w-96 space-y-8">
              <section className="space-y-6">
                <div className="bg-surface-container-low p-6 rounded-3xl space-y-6">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Location</label>
                  <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm">
                    <TableIcon className="text-primary" size={24} />
                    <div>
                      <span className="block text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Table Number</span>
                      <span className="text-xl font-bold">{tableNumber}</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant italic opacity-70">Verified via QR entry at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.</p>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Special Instructions</label>
                  <textarea 
                    className="w-full bg-surface-container-low border-none rounded-3xl p-6 focus:ring-2 focus:ring-primary/20 min-h-[150px] font-sans text-sm placeholder:text-on-surface-variant/40 transition-all" 
                    placeholder="E.g. No pine nuts on the burrata please..."
                  />
                </div>
              </section>

              <section className="bg-surface-container p-6 rounded-3xl">
                <div className="space-y-5 font-sans">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-sm font-medium">Service Fee (15%)</span>
                    <span className="font-bold">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-sm font-medium">GST</span>
                    <span className="font-bold">${gst.toFixed(2)}</span>
                  </div>
                  <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                    <span className="text-2xl font-serif font-bold">Total</span>
                    <span className="text-3xl font-serif font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button onClick={handlePlaceOrder} className="w-full mt-8 py-4 gap-3 text-lg">
                  <span>Place Order</span>
                  <ArrowRight size={20} />
                </Button>
              </section>
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
};

const OrdersScreen = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm shadow-on-surface/5 md:left-72 md:w-[calc(100%-18rem)]">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Utensils className="text-primary md:hidden" size={24} />
            <span className="font-serif italic text-primary text-2xl">Kopitiam 1924</span>
          </div>
          <IconButton icon={Bell} />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-3 font-serif">Your Orders</h1>
          <p className="text-on-surface-variant font-sans text-base md:text-lg">Your local favorites, coming right up</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {orders.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl editorial-shadow">
              <p className="text-on-surface-variant mb-8 text-lg">You haven't placed any orders yet</p>
              <Button onClick={() => navigate('/')} size="lg">Browse Menu</Button>
            </div>
          ) : (
            orders.map(order => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id} 
                className="bg-white rounded-3xl p-8 editorial-shadow space-y-8 border border-outline-variant/5"
              >
                <div className="flex justify-between items-start border-b border-outline-variant/10 pb-6">
                  <div>
                    <h3 className="font-bold text-xl text-on-surface">Order #{order.id}</h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-2 font-bold opacity-70">
                      {order.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {order.items.length} Items
                    </p>
                  </div>
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm",
                    order.status === 'Pending' ? "bg-primary/10 text-primary" : "bg-secondary-container text-on-secondary-container"
                  )}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary text-sm">{item.quantity}x</span>
                          <span className="text-sm font-bold text-on-surface">{item.name}</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-on-surface-variant">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="font-bold text-on-surface text-lg">Total Amount</span>
                  <span className="font-serif font-bold text-2xl text-primary">${order.total.toFixed(2)}</span>
                </div>
              </motion.div>
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
          <h1 className="font-serif font-bold text-2xl text-on-surface">Kopitiam Management</h1>
          <p className="font-sans text-sm text-on-surface-variant">Live metrics for Today's Service</p>
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
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-6 rounded-[1.5rem] text-on-primary shadow-xl shadow-primary/10 flex flex-col justify-between">
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
            <div className="bg-surface-container-low rounded-[2rem] p-6 min-h-[400px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#004d40 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
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
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
  const [isTableActive, setIsTableActive] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  const handleScan = (table: string) => {
    setTableNumber(table);
    setIsTableActive(true);
  };

  return (
    <CartProvider>
      <Router>
        <AnimatePresence mode="wait">
          {!isTableActive ? (
            <motion.div 
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen"
            >
              <Routes>
                <Route path="*" element={<ScanScreen onScan={handleScan} />} />
              </Routes>
            </motion.div>
          ) : (
            <motion.div 
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen"
            >
              <Routes>
                <Route path="/" element={<MenuScreen />} />
                <Route path="/dish/:id" element={<ProductDetailScreen />} />
                <Route path="/cart" element={<CartScreen tableNumber={tableNumber || 'Twelve'} />} />
                <Route path="/orders" element={<OrdersScreen />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </CartProvider>
  );
}
