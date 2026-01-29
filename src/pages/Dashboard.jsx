
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

            <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
                {top10.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative overflow-hidden rounded border w-[130px] flex-shrink-0 flex flex-col transition-all duration-300 ${index < 3 ? 'border-emerald-500/40 bg-slate-900/80 shadow-lg shadow-emerald-900/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
                            }`}
                    >
                        {/* 1. IMAGE SECTION (Fixed Height, No Overlap) */}
                        <div className="h-20 w-full relative shrink-0">
                            <img
                                src={player.image}
                                alt={player.name}
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Rank Badge */}
                            <div className={`absolute top-0 right-0 px-1.5 py-0.5 text-[10px] font-black tracking-tighter ${index === 0 ? 'bg-yellow-500 text-black' : 'bg-slate-800/90 text-white'}`}>
                                #{player.rank}
                            </div>
                        </div>

                        {/* 2. CONTENT SECTION (Below Image) */}
                        <div className="p-2 flex flex-col h-full justify-between bg-slate-900/40">
                            <div>
                                <div className="text-[9px] text-emerald-400 font-mono mb-0.5">{player.stats2026.points} pts</div>
                                <h3 className="font-bold text-[11px] leading-3 text-white mb-2 line-clamp-2 min-h-[22px]">
                                    {player.name}
                                </h3>
                            </div>

                            <Link to={`/player/${player.id}`} className="block w-full text-center py-1 bg-white/5 hover:bg-emerald-500 text-[9px] text-slate-400 hover:text-white rounded transition-colors">
                                View
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tournament Calendar Grid */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Schedule <span className="text-xs font-normal text-slate-500 ml-2">(Click for Course Info)</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-12 overflow-x-auto pb-4">
                {tournaments.slice(0, 4).map((t, i) => {
                    const [month, days] = t.date.split(' ');

                    return (
                        <Link
                            to={`/tournament/${t.id}`}
                            key={i}
                            className="calendar-card glass-panel p-0 rounded-xl overflow-hidden relative group hover:bg-slate-800/60 transition-colors flex-1 min-w-[240px]"
                        >
                            <div className="flex h-full w-full">
                                {/* Left: Date Box */}
                                <div className="bg-white/5 w-14 flex flex-col items-center justify-center border-r border-white/5 p-2 text-center group-hover:bg-white/10 transition-colors shrink-0">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{month}</span>
                                    <span className="text-xl font-black text-white">{days.split('-')[0]}</span>
                                </div>

                                {/* Right: Info */}
                                <div className="p-3 flex-1 flex flex-col justify-center min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-white leading-tight mb-1 truncate pr-2">{t.name}</h4>
                                        <Flag className="w-3 h-3 text-slate-600 shrink-0" />
                                    </div>
                                    <div className="text-[10px] text-slate-400 mb-2 truncate">{t.venue}</div>

                                    {t.favors && (
                                        <div className="inline-flex items-center gap-1 text-[9px] bg-slate-800/50 px-1.5 py-0.5 rounded self-start border border-slate-700/50">
                                            <Target className="w-2.5 h-2.5 text-yellow-500" />
                                            <span className="text-slate-300">Fit: {t.favors}</span>
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
