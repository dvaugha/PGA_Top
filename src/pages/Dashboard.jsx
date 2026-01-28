
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, TrendingUp, DollarSign, Flag } from 'lucide-react';
import { players, tournaments } from '../data/golfData';

const Dashboard = () => {
    // Sort players by rank explicitly to be sure
    const top10 = players.sort((a, b) => a.rank - b.rank).slice(0, 10);

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-6"
            >
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
                        PGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Analytics</span>
                    </h1>
                    <p className="text-lg text-slate-400">2026 Season Performance & Insights</p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Current Leader</div>
                    <div className="text-2xl font-bold text-white flex items-center justify-end gap-2">
                        Scottie Scheffler <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                </div>
            </motion.div>

            {/* Top 10 Grid Layout */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" /> FedExCup Top 10
            </h2>

            <div className="player-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {top10.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${index < 3 ? 'border-emerald-500/30 bg-slate-800/80 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]' : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                            }`}
                    >
                        {/* Background Rank Number */}
                        <div className="absolute -right-4 -top-6 text-[120px] font-black text-white/5 pointer-events-none select-none z-0 tracking-tighter">
                            {player.rank}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Player Image Area */}
                            <div className="h-32 w-full overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80" />
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
                                />

                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg z-20 flex items-center gap-1">
                                        <Trophy className="w-3 h-3" /> #1
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-mono text-emerald-400 tracking-wider">
                                            {player.country}
                                        </span>
                                        <span className="text-xs text-slate-500 font-bold">
                                            {player.stats2026.points} PTS
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight mb-2 text-white group-hover:text-emerald-400 transition-colors">
                                        {player.name}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mt-2">
                                        <div className="bg-white/5 rounded p-2 text-center">
                                            <div className="text-[10px] uppercase opacity-60">Avg Score</div>
                                            <div className="text-white font-mono">{player.stats2026.scoringAvg}</div>
                                        </div>
                                        <div className="bg-white/5 rounded p-2 text-center">
                                            <div className="text-[10px] uppercase opacity-60">Driving</div>
                                            <div className="text-white font-mono">{player.stats2026.drivingDist}</div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/player/${player.id}`}
                                    className="mt-4 w-full py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-sm rounded flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                >
                                    View Analytics <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Secondary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {tournaments.slice(0, 4).map((t, i) => (
                    <div key={i} className="glass-panel p-4 rounded-lg flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                        <div>
                            <div className="text-xs text-slate-500 uppercase">{t.date}</div>
                            <div className="font-semibold text-sm">{t.name}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${t.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {t.status}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;
