import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import MenuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import { Search, Filter, Grid, List, Star, Clock, DollarSign } from 'lucide-react';

import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../Hook/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');

    // Filter menu items by category
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');
    const drinks = menu.filter(item => item.category === 'drinks' || item.category === 'drink');
    const popular = menu.filter(item => item.popular === true || item.category === 'popular');

    // Create categories array for easier management
    const categories = [
        { id: 'all', name: 'All Items', items: menu, count: menu.length, icon: '🍽️' },
        { id: 'offered', name: "Today's Offered", items: offered, count: offered.length, icon: '⭐' },
        { id: 'popular', name: 'Popular Items', items: popular, count: popular.length, icon: '🔥' },
        { id: 'drinks', name: 'Drinks & Beverages', items: drinks, count: drinks.length, icon: '🥤' },
        { id: 'pizza', name: 'Pizzas', items: pizza, count: pizza.length, icon: '🍕' },
        { id: 'soup', name: 'Soups', items: soup, count: soup.length, icon: '🍲' },
        { id: 'salad', name: 'Salads', items: salad, count: salad.length, icon: '🥗' },
        { id: 'dessert', name: 'Desserts', items: dessert, count: dessert.length, icon: '🍰' }
    ];

    // Get current category items
    const getCurrentItems = () => {
        const currentCategory = categories.find(cat => cat.id === activeCategory);
        let items = currentCategory ? currentCategory.items : menu;

        // Apply search filter
        if (searchTerm) {
            items = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.recipe.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price':
                return items.sort((a, b) => a.price - b.price);
            case 'rating':
                return items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'name':
            default:
                return items.sort((a, b) => a.name.localeCompare(b.name));
        }
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>BISTRO BOSS | Complete Menu</title>
            </Helmet>

            {/* Hero Section */}
            <Cover img={MenuImg} title='our menu'></Cover>

            {/* User-Friendly Menu Interface */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search and Filter Bar */}
                

                {/* Category Navigation */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                                    activeCategory === category.id
                                        ? 'bg-orange-500 text-white shadow-lg'
                                        : 'bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100'
                                }`}
                            >
                                <div className="text-3xl mb-2">{category.icon}</div>
                                <h3 className="font-semibold text-sm">{category.name}</h3>
                                <p className="text-xs opacity-75 mt-1">({category.count} items)</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Category Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {categories.find(cat => cat.id === activeCategory)?.name}
                        </h2>
                        <p className="text-gray-600 mt-1">
                            {getCurrentItems().length} items found
                            {searchTerm && ` for "${searchTerm}"`}
                        </p>
                    </div>
                    
                   
                </div>

                {/* Menu Items Display */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    {getCurrentItems().length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div>
                            {activeCategory === 'all' ? (
                                // Show all categories when 'all' is selected
                                <div className="space-y-16">
                                    {offered.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">⭐</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Today's Offered</h3>
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    Limited Time
                                                </span>
                                            </div>
                                            <MenuCategory items={offered} />
                                        </div>
                                    )}

                                    {popular.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🔥</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Popular Items</h3>
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    Customer Favorites
                                                </span>
                                            </div>
                                            <MenuCategory items={popular} />
                                        </div>
                                    )}

                                    {drinks.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🥤</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Drinks & Beverages</h3>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    Refreshing
                                                </span>
                                            </div>
                                            <MenuCategory items={drinks} title='drinks' />
                                        </div>
                                    )}
                                    
                                    {pizza.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🍕</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Artisan Pizzas</h3>
                                            </div>
                                            <MenuCategory items={pizza} title='pizza' />
                                        </div>
                                    )}
                                    
                                    {soup.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🍲</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Comfort Soups</h3>
                                            </div>
                                            <MenuCategory items={soup} title='soup' />
                                        </div>
                                    )}
                                    
                                    {salad.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🥗</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Fresh Salads</h3>
                                            </div>
                                            <MenuCategory items={salad} title='salad' />
                                        </div>
                                    )}
                                    
                                    {dessert.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl">🍰</span>
                                                <h3 className="text-2xl font-bold text-gray-800">Sweet Desserts</h3>
                                            </div>
                                            <MenuCategory items={dessert} title='dessert' />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Show specific category
                                <MenuCategory 
                                    items={getCurrentItems()} 
                                    title={activeCategory === 'offered' ? undefined : activeCategory}
                                />
                            )}
                        </div>
                    )}
                </div>

               
            </div>
        </div>
    );
};

export default Menu;