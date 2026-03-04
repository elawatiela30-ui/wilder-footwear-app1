import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Instagram, 
  Facebook, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Menu,
  Globe,
  ArrowUpRight,
  X,
  ExternalLink,
  Ruler,
  Info
} from 'lucide-react';

// --- Constants & Types ---

const WHATSAPP_NUMBER = "6282298650656";
const BRAND_NAME = "WILDER";
const SHOPEE_URL = "https://shopee.co.id/wilder_footwear";
const TOKOPEDIA_URL = "https://www.tokopedia.com/wilderfootwear";
const TIKTOK_URL = "https://www.tiktok.com/@wilder_footwear?_r=1&_t=ZS-94PhuNxx4AD";
const INSTAGRAM_URL = "https://www.instagram.com/wilder_footwear?igsh=MWx6NWc3MDR0dnltZA==";

const SIZE_CHART = [
  { cm: "24.5", eu: "39", uk: "5.5", us: "6.5", jp: "24.5" },
  { cm: "25.0", eu: "40", uk: "6.5", us: "7.5", jp: "25.0" },
  { cm: "26.0", eu: "41", uk: "7.5", us: "8.5", jp: "26.0" },
  { cm: "26.5", eu: "42", uk: "8.0", us: "9.0", jp: "26.5" },
  { cm: "27.5", eu: "43", uk: "9.0", us: "10.0", jp: "27.5" },
  { cm: "28.0", eu: "44", uk: "9.5", us: "10.5", jp: "28.0" },
];

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  image: string;
  category: string;
  shopeeUrl?: string;
  tiktokUrl?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "WILDER Footwear® stealth suede mules",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black leather loafer with a clean silhouette and minimal buckle detail. Subtle contrast stitching adds character without being excessive. Durable chunky sole built for everyday comfort and stability. Easy to pair for both smart and casual looks.",
    image: "https://i.ibb.co.com/9mYwcYfb/1-20260211-193358-0000.png",
    category: "Mules",
    shopeeUrl: "https://s.shopee.co.id/4LENRDo21Q",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFsjNVu1Wh-N62xF/"
  },
  {
    id: 2,
    name: "WILDER Footwear® heritage leather mules",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black slip-on shoes with a sleek and simple design. Smooth upper with clean stitching details. Sturdy sole provides stable and comfortable support. Suitable for everyday wear and semi-formal occasions.",
    image: "https://i.ibb.co.com/Nd2NQykN/Salinan-dari-Salinan-dari-official-store-20260207-140525-0000.png",
    category: "Mules",
    shopeeUrl: "https://s.shopee.co.id/9fFthsBkMR",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFsfC35jow-qXYCO/"
  },
  {
    id: 3,
    name: "WILDER Footwear® heritage loafers leather",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black loafers with a timeless and clean design. Classic tassel detail for a refined touch. Thick sole with contrast stitching for added character. Comfortable for daily wear and smart casual looks.",
    image: "https://i.ibb.co.com/LdRmwsyp/1-20260206-160631-0000.png",
    category: "Loafers",
    shopeeUrl: "https://s.shopee.co.id/7AYYogJAdb",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFsXTKRVbP-Prk1b/"
  },
  {
    id: 4,
    name: "WILDER Footwear® star accent loafer",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black slip-on shoes with a clean and modern design. Soft upper material with neat contrast stitching detail. Lightweight sole for comfortable daily wear. Easy to wear and perfect for casual or semi-formal style.",
    image: "https://i.ibb.co.com/Fkmmcn4T/Desain-tanpa-judul-20260304-191305-0000.png",
    category: "Loafers",
    shopeeUrl: "https://s.shopee.co.id/9fFthsBkMR",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFGRpNUYoo-2WPx2/"
  },
  {
    id: 5,
    name: "WILDER Footwear® smille accent loafers",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black loafer with a clean and simple design. Classic tassel detail adds a subtle touch of style. Thick and sturdy sole for all-day comfort. Easy to match with both formal and casual outfits.",
    image: "https://i.ibb.co.com/spbmzGJg/1-20260207-150630-0000.png",
    category: "Loafers",
    shopeeUrl: "https://s.shopee.co.id/7poFcBehX4",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFGUDPnrer-qVd5I/"
  },
  {
    id: 6,
    name: "WILDER Footwear® voyager suede",
    price: "Rp 75.000",
    originalPrice: "Rp 180.000",
    description: "Black suede-style shoes with a clean and minimal look. Contrast stitching adds a subtle yet stylish detail. Lightweight sole designed for daily comfort and support. Perfect for casual wear or smart everyday outfits.",
    image: "https://i.ibb.co.com/rGqk33Tt/1-20260207-141254-0000.png",
    category: "Suede",
    shopeeUrl: "https://s.shopee.co.id/1BHLg4eimz",
    tiktokUrl: "https://vt.tokopedia.com/t/ZS9dFGbKdfpjp-aWycZ/"
  }
];

// --- Components ---

const Marquee = ({ text }: { text: string }) => (
  <div className="bg-charcoal py-3 overflow-hidden whitespace-nowrap border-y border-offwhite/10">
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-offwhite/60 mx-8 font-medium">
          {text}
        </span>
      ))}
    </motion.div>
  </div>
);

const WhatsAppButton = ({ productName, className = "", children }: { productName?: string, className?: string, children?: React.ReactNode }) => {
  const message = productName 
    ? `Halo WILDER, saya tertarik untuk memesan produk: ${productName}. Apakah stoknya masih tersedia?`
    : "Halo WILDER, saya ingin bertanya mengenai koleksi terbaru.";
  
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-charcoal text-offwhite px-6 py-3 hover:bg-taupe transition-all duration-300 font-bold tracking-wide ${className}`}
    >
      {children || (
        <>
          <MessageCircle size={18} />
          <span>Order via WhatsApp</span>
        </>
      )}
    </a>
  );
};

const ProductModal = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
  const [showSizeChart, setShowSizeChart] = useState(false);
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-offwhite w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-charcoal text-offwhite rounded-full hover:bg-taupe transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 aspect-square bg-white relative">
          <AnimatePresence mode="wait">
            {showSizeChart ? (
              <motion.div
                key="size-chart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute inset-0 bg-white p-8 overflow-y-auto"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Ruler size={18} className="text-taupe" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Size Chart</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-charcoal/10">
                        <th className="py-3 font-bold uppercase tracking-tighter">Kaki (cm)</th>
                        <th className="py-3 font-bold uppercase tracking-tighter">EU (ID)</th>
                        <th className="py-3 font-bold uppercase tracking-tighter">UK</th>
                        <th className="py-3 font-bold uppercase tracking-tighter">US</th>
                        <th className="py-3 font-bold uppercase tracking-tighter">JP</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal/60">
                      {SIZE_CHART.map((row, idx) => (
                        <tr key={idx} className="border-b border-charcoal/5 hover:bg-offwhite transition-colors">
                          <td className="py-3 font-medium text-charcoal">{row.cm} cm</td>
                          <td className="py-3">{row.eu}</td>
                          <td className="py-3">{row.uk}</td>
                          <td className="py-3">{row.us}</td>
                          <td className="py-3">{row.jp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-4 bg-offwhite rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={14} className="text-taupe" />
                    <h4 className="text-[9px] font-bold uppercase tracking-widest">Cara Mengukur:</h4>
                  </div>
                  <ol className="text-[9px] text-charcoal/60 space-y-2 leading-relaxed">
                    <li>1. Berdirilah pada permukaan datar dengan tumit menempel pada dinding.</li>
                    <li>2. Letakkan penggaris atau meteran tepat sepanjang kaki.</li>
                    <li>3. Ukur dari ujung jari kaki terpanjang hingga bagian belakang tumit.</li>
                  </ol>
                </div>

                <button 
                  onClick={() => setShowSizeChart(false)}
                  className="mt-8 w-full py-3 text-[10px] uppercase tracking-widest font-bold border border-charcoal/10 hover:bg-charcoal hover:text-white transition-all"
                >
                  Kembali ke Produk
                </button>
              </motion.div>
            ) : (
              <motion.img 
                key="product-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-offwhite">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-taupe font-bold">{product.category}</span>
            <button 
              onClick={() => setShowSizeChart(true)}
              className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-taupe transition-colors"
            >
              <Ruler size={12} />
              Size Chart
            </button>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black italic tracking-tighter mb-6">{product.name}</h2>
          
          <div className="mb-8">
            <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
              {product.description}
            </p>
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-sans font-bold text-charcoal">{product.price}</p>
              {product.originalPrice && (
                <p className="text-sm text-charcoal/40 line-through font-medium">{product.originalPrice}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <WhatsAppButton productName={product.name} className="w-full py-4 text-xs tracking-widest uppercase" />
            
            <div className="grid grid-cols-2 gap-4">
              {product.shopeeUrl && (
                <a 
                  href={product.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-charcoal text-charcoal py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-charcoal hover:text-offwhite transition-all"
                >
                  <ShoppingBag size={14} />
                  Shopee
                </a>
              )}
              {product.tiktokUrl && (
                <a 
                  href={product.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-charcoal text-charcoal py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-charcoal hover:text-offwhite transition-all"
                >
                  <ShoppingBag size={14} />
                  TikTok Shop
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-charcoal/10 flex items-center gap-4 text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> Original</span>
            <span className="flex items-center gap-1"><Clock size={10} /> Ready Stock</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-offwhite selection:bg-taupe selection:text-charcoal overflow-x-hidden">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-offwhite/95 backdrop-blur-md py-4 border-b border-charcoal/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-10">
            <a href="#shop" className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-taupe transition-colors">Shop All</a>
            <a href="#story" className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-taupe transition-colors">Story</a>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="#" className="flex items-center gap-1 group">
              {/* You can replace this stylized text with an <img> tag once you have a URL */}
              {/* <img src="/path-to-your-logo.png" alt="WILDER" className="h-8 md:h-10" /> */}
              <span className="text-2xl md:text-4xl font-sans font-black italic lowercase tracking-tighter text-charcoal">
                wilder<span className="text-[10px] md:text-[14px] align-top font-sans not-italic font-bold">®</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:text-taupe transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative h-[100vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img 
            src="https://i.ibb.co.com/Z1Ym1dBp/Gemini-Generated-Image-zg1l4xzg1l4xzg1l.png" 
            alt="Wilder Hero" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-offwhite/60 mb-8 block font-medium">Horizon Lights Winds Navigate</span>
            <h2 className="text-5xl md:text-[10vw] font-sans font-black italic lowercase text-offwhite leading-[0.85] tracking-tighter mb-12">
              Refined Simplicity<br />for Modern Steps
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <WhatsAppButton className="w-full sm:w-auto px-10 py-4 text-xs tracking-[0.2em] uppercase" />
              <a href="#shop" className="group flex items-center gap-3 text-offwhite text-xs uppercase tracking-[0.2em] hover:text-taupe transition-colors">
                Explore Collection <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.4em] text-offwhite">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-offwhite/30"></div>
        </div>
      </header>

      <Marquee text="Marketplace Available • Crafted in Indonesia • Premium Footwear • Wilder®" />

      {/* --- Brand Story Section --- */}
      <section id="story" className="py-40 px-6 bg-white text-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-taupe font-bold mb-12 block">Our Story</span>
            
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-sans font-bold leading-tight tracking-tight">
                WILDER was born from a simple understanding:<br />
                people want well-made shoes without unnecessary excess.
              </p>
              
              <div className="flex flex-col gap-2 text-lg md:text-xl font-medium text-charcoal/60">
                <span>Clean lines.</span>
                <span>Balanced proportions.</span>
                <span>Reliable construction.</span>
              </div>

              <div className="py-8">
                <p className="text-xl md:text-2xl font-sans font-bold">
                  Nothing exaggerated. Nothing inflated.<br />
                  Just thoughtful design and honest value.
                </p>
              </div>

              <p className="text-lg md:text-xl italic text-charcoal/80">
                Because true style does not chase attention —<br />
                it endures.
              </p>

              <div className="pt-12">
                <h3 className="text-4xl md:text-6xl font-sans font-black italic lowercase tracking-tighter mb-4">wilder</h3>
                <div className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.3em] font-bold text-taupe">
                  <span>Designed to last.</span>
                  <span>Priced with integrity.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Categories / Shop --- */}
      <section id="shop" className="py-32 px-6 bg-offwhite">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-charcoal/10 pb-8">
            <h2 className="text-2xl md:text-4xl font-sans font-bold uppercase tracking-tighter">Core Collection</h2>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium">
              {["All", "Loafers", "Mules", "Suede"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-all duration-300 pb-1 ${activeCategory === cat ? 'text-charcoal border-b border-charcoal' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {PRODUCTS.filter(p => activeCategory === "All" || p.category === activeCategory).map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-square overflow-hidden bg-white mb-8">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal text-offwhite text-[9px] uppercase tracking-widest px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Detail
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-taupe font-medium mb-2 block">{product.category}</span>
                    <h3 className="text-sm font-sans font-bold tracking-wider mb-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <p className="text-xs text-charcoal font-bold tracking-tight">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-[10px] text-charcoal/30 line-through font-medium">{product.originalPrice}</p>
                      )}
                    </div>
                    <button className="px-8 py-2.5 text-[10px] uppercase tracking-widest bg-charcoal text-offwhite hover:bg-taupe transition-colors font-bold">
                      Detail Produk
                    </button>
                  </div>
                  <div className="w-10 h-10 border border-charcoal/10 rounded-full flex items-center justify-center group-hover:bg-charcoal group-hover:text-offwhite transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal section removed as requested */}

      {/* --- Final CTA --- */}
      <section className="py-40 px-6 bg-taupe text-charcoal text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
          <span className="text-[30vw] font-sans font-black italic lowercase whitespace-nowrap leading-none">wilder wilder wilder</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-sans font-black italic lowercase leading-none tracking-tighter mb-12">Step Into<br />Better</h2>
          <WhatsAppButton className="px-16 py-5 text-sm tracking-[0.3em] uppercase shadow-2xl" />
          <div className="mt-12 flex justify-center gap-10 text-[10px] uppercase tracking-widest font-bold opacity-40">
            <span className="flex items-center gap-2"><ShoppingBag size={12} /> Marketplace Available</span>
            <span className="flex items-center gap-2"><ShieldCheck size={12} /> Secure Order</span>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-charcoal text-offwhite py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="mb-8">
                <span className="text-3xl font-sans font-black italic lowercase tracking-tighter text-offwhite">
                  wilder<span className="text-[12px] align-top font-sans not-italic font-bold">®</span>
                </span>
              </div>
              <p className="text-offwhite/40 text-sm max-w-sm leading-relaxed">
                Timeless footwear. Honest quality. Crafted in Indonesia for the global explorer.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-taupe">Navigation</h4>
              <ul className="space-y-4 text-xs uppercase tracking-widest text-offwhite/60 font-medium">
                <li><a href="#shop" className="hover:text-offwhite transition-colors">Shop All</a></li>
                <li><a href="#story" className="hover:text-offwhite transition-colors">Story</a></li>
                <li><a href="#" className="hover:text-offwhite transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-taupe">Marketplace</h4>
              <ul className="space-y-4 text-xs uppercase tracking-widest text-offwhite/60 font-medium">
                <li><a href={SHOPEE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">Shopee</a></li>
                <li><a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">TikTok Shop</a></li>
                <li><a href={TOKOPEDIA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">Tokopedia</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-taupe">Connect</h4>
              <ul className="space-y-4 text-xs uppercase tracking-widest text-offwhite/60 font-medium">
                <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">Instagram</a></li>
                <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">WhatsApp</a></li>
                <li><a href="mailto:goodmilessportwear@gmail.com" className="hover:text-offwhite transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-offwhite/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-offwhite/20">© 2024 Wilder Footwear. All rights reserved.</p>
            <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-offwhite/20">
              <a href="#" className="hover:text-offwhite transition-colors">Privacy</a>
              <a href="#" className="hover:text-offwhite transition-colors">Terms</a>
              <a href="#" className="hover:text-offwhite transition-colors">Shipping</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo WILDER, saya ingin bertanya mengenai koleksi terbaru.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end"
          >
            <div 
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-offwhite h-full shadow-2xl p-12 flex flex-col"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 p-2 hover:text-taupe transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mt-20 flex flex-col gap-8">
                <a 
                  href="#shop" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-sans font-black italic lowercase tracking-tighter hover:text-taupe transition-colors"
                >
                  Shop All
                </a>
                <a 
                  href="#story" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-sans font-black italic lowercase tracking-tighter hover:text-taupe transition-colors"
                >
                  Our Story
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-sans font-black italic lowercase tracking-tighter hover:text-taupe transition-colors"
                >
                  Contact
                </a>
              </div>

              <div className="mt-auto pt-12 border-t border-charcoal/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-taupe font-bold mb-6 block">Follow Us</span>
                <div className="flex gap-6">
                  <a href="#" className="text-charcoal/40 hover:text-charcoal transition-colors uppercase text-[10px] tracking-widest font-bold">Instagram</a>
                  <a href="#" className="text-charcoal/40 hover:text-charcoal transition-colors uppercase text-[10px] tracking-widest font-bold">TikTok</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
