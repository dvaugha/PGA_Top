
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, TrendingUp, DollarSign, Flag, Calendar, Target } from 'lucide-react';
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

            <div className="player-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
                {top10.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative overflow-hidden rounded-md border transition-all duration-300 ${index < 3 ? 'border-emerald-500/30 bg-slate-800/80' : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                            }`}
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Ultra Mini Image */}
                            <div className="h-24 w-full shrink-0 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
                                />
                                {index === 0 && (
                                    <div className="absolute top-1 left-1 text-yellow-400 z-20">
                                        <Trophy className="w-3 h-3" />
                                    </div>
                                )}
                            </div>

                            {/* Ultra Mini Content */}
                            <div className="p-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center text-[9px] text-slate-400 mb-0.5">
                                        <span>#{player.rank}</span>
                                        <span>{player.country}</span>
                                    </div>
                                    <h3 className="font-bold text-xs text-white leading-tight truncate mb-1">
                                        {player.name}
                                    </h3>
                                    <div className="text-[9px] font-mono text-emerald-400">
                                        {player.stats2026.points} pts
                                    </div>
                                </div>
                                <Link to={`/player/${player.id}`} className="mt-1.5 text-[9px] text-blue-400 hover:text-white flex items-center justify-end">
                                    View <ArrowRight className="w-2 h-2 ml-0.5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tournament Calendar Grid */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Schedule <span className="text-xs font-normal text-slate-500 ml-2">(Click for Course Info)</span>
            </h2>

            <div className="flex flex-wrap gap-4 mb-12 w-full">
                {tournaments.slice(0, 4).map((t, i) => {
                    const [month, days] = t.date.split(' ');

                    return (
                        <Link
                            to={`/tournament/${t.id}`}
                            key={i}
                            className="calendar-card glass-panel p-0 rounded-xl overflow-hidden relative group hover:bg-slate-800/60 transition-colors block"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Flag className="w-20 h-20" />
                            </div>

                            <div className="flex h-full w-full">
                                {/* Calendar Date Column */}
                                <div className="bg-white/5 w-16 flex flex-col items-center justify-center border-r border-white/5 p-2 text-center group-hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{month}</span>
                                    <span className="text-lg font-black text-white">{days.split('-')[0]}</span>
                                    <span className="text-[10px] text-slate-500 mt-1">{t.status === 'Completed' ? 'DONE' : 'NEXT'}</span>
                                </div>

                                {/* Event Info */}
                                <div className="p-3 flex-1 flex flex-col justify-center z-10">
                                    <h4 className="font-bold text-sm text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">{t.name}</h4>
                                    <div className="text-xs text-slate-400 mb-2 truncate">{t.venue}</div>

                                    {t.favors && (
                                        <div className="flex items-center gap-1.5 text-[10px] mt-auto">
                                            <Target className="w-3 h-3 text-yellow-500" />
                                            <span className="text-slate-500">Fit:</span>
                                            <span className="text-slate-300 font-semibold">{t.favors}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
};

export default Dashboard;
