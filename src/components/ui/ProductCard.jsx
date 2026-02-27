import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useLang } from '../../context/LanguageContext';
import { getProductText } from '../../data/products';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { lang } = useLang();
    const [wishlisted, setWishlisted] = useState(false);
    const name = getProductText(product, 'name', lang);

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ ...product, name, quantity: 1 }));
        toast.success(lang === 'mr' ? `${name} कार्टमध्ये जोडले!` : `${name} added to cart!`, {
            position: 'bottom-right', autoClose: 2000, hideProgressBar: true,
        });
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlisted(!wishlisted);
        toast(wishlisted
            ? (lang === 'mr' ? 'विशलिस्टमधून काढले' : 'Removed from wishlist')
            : (lang === 'mr' ? 'विशलिस्टमध्ये जोडले' : 'Added to wishlist'),
            { position: 'bottom-right', autoClose: 1500, hideProgressBar: true }
        );
    };

    return (
        <Link to={`/product/${product.id}`} className="block group" aria-label={name}>
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-soft border border-brand-gray/30 h-full flex flex-col">

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-brand-cream img-zoom">
                    <img
                        src={product.image}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    {product.isNew && (
                        <span className="absolute top-2.5 left-2.5 bg-brand-green text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm z-10">
                            {lang === 'mr' ? 'नवीन' : 'New'}
                        </span>
                    )}
                    {product.originalPrice && (
                        <span className="absolute top-2.5 right-2.5 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                    )}

                    {/* Wishlist button - always visible top-right */}
                    <button
                        onClick={handleWishlist}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 icon-btn ${wishlisted
                                ? 'bg-red-500 text-white shadow-md'
                                : 'bg-white/80 backdrop-blur-sm text-brand-dark/60 hover:bg-white hover:text-red-500 shadow-sm'
                            } ${product.originalPrice ? 'top-10' : ''}`}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <FiHeart size={14} className={wishlisted ? 'fill-current' : ''} />
                    </button>

                    {/* Quick Actions - slide up from bottom on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 bg-brand-green text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-brand-dark transition-colors icon-btn min-h-[36px]"
                            aria-label={lang === 'mr' ? 'कार्टमध्ये टाका' : 'Add to cart'}
                        >
                            <FiShoppingCart size={14} />
                            <span className="hidden sm:inline">{lang === 'mr' ? 'कार्टमध्ये टाका' : 'Add to Cart'}</span>
                        </button>
                        <Link
                            to={`/product/${product.id}`}
                            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-brand-dark flex items-center justify-center shadow-lg hover:bg-white transition-colors icon-btn"
                            aria-label="Quick view"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FiEye size={14} />
                        </Link>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-3.5 md:p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-brand-dark text-sm md:text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-green transition-colors duration-200">
                        {name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="inline-flex items-center gap-0.5 bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {product.rating} ★
                        </span>
                        <span className="text-[11px] text-brand-dark/45">({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto flex items-end gap-2">
                        <span className="font-bold text-brand-dark text-base md:text-lg">₹{product.price}</span>
                        {product.originalPrice && (
                            <>
                                <span className="text-brand-dark/35 line-through text-xs mb-0.5">₹{product.originalPrice}</span>
                                <span className="text-brand-green text-xs font-semibold mb-0.5">
                                    {lang === 'mr' ? 'बचत' : 'Save'} ₹{product.originalPrice - product.price}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
