
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react';
import { APP_VERSION } from '../version';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <Activity className="w-4 h-4" /> },
        { name: 'Rankings', path: '/rankings', icon: <Trophy className="w-4 h-4" /> },
        { name: 'Schedule', path: '/schedule', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Net Worth', path: '/net-worth', icon: <DollarSign className="w-4 h-4" /> },
    ];

    return (
        <nav className="glass-panel sticky top-0 z-50 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white text-lg">P</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">PGA<span className="text-emerald-400">Analytics</span></span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white ${location.pathname === item.path ? 'text-emerald-400' : 'text-slate-400'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                            {APP_VERSION}
                        </span>
                        <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                <span className="text-xs">USR</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
