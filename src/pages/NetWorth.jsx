
import React from 'react';
import { players } from '../data/golfData';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const NetWorth = () => {
    // Sort by net worth (parsing string like "$110M")
    const sortedPlayers = [...players].sort((a, b) => {
        const valA = parseFloat(a.netWorth.replace('$', '').replace('M', ''));
        const valB = parseFloat(b.netWorth.replace('$', '').replace('M', ''));
        return valB - valA;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Highest Paid Golfers <span className="text-emerald-500">2026</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPlayers.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 flex items-center gap-4"
                    >
                        <div className="text-4xl font-bold text-slate-700">#{index + 1}</div>
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30">
                            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{player.name}</h3>
                            <div className="flex items-center gap-1 text-emerald-400 font-bold text-xl">
                                <DollarSign className="w-5 h-5" /> {player.netWorth}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">Est. Net Worth</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 glass-panel p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Financial Insights 2026</h2>
                <p className="text-slate-400 leading-relaxed">
                    The financial landscape of professional golf continues to skyrocket in 2026.
                    Top players are now commanding endorsement deals that rival major league sports stars.
                    Key sponsors like <span className="text-white">Nike</span>, <span className="text-white">TaylorMade</span>, and <span className="text-white">Rolex</span> remain dominant,
                    but new players from the financial and tech sectors are entering the space aggressively.
                </p>
            </div>
        </div>
    );
};

export default NetWorth;
