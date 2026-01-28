
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, TrendingUp, DollarSign, Flag, Calendar } from 'lucide-react';
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

            <div className="player-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                {top10.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative overflow-hidden rounded-lg border transition-all duration-300 ${index < 3 ? 'border-emerald-500/30 bg-slate-800/80 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]' : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                            }`}
                    >
                        <div className="absolute -right-2 -top-4 text-[80px] font-black text-white/5 pointer-events-none select-none z-0 tracking-tighter">
                            {player.rank}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Player Image Area - Ultra Compact */}
                            <div className="h-24 w-full overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80" />
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
                                />

                                {index === 0 && (
                                    <div className="absolute top-1 left-1 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg z-20 flex items-center gap-1">
                                        <Trophy className="w-2.5 h-2.5" /> #1
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                                            {player.country}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold">
                                            {player.stats2026.points} PTS
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-sm leading-tight mb-2 text-white group-hover:text-emerald-400 transition-colors truncate">
                                        {player.name}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 mt-1">
                                        <div className="bg-white/5 rounded p-1 text-center">
                                            <div className="text-[9px] uppercase opacity-60">Avg Score</div>
                                            <div className="text-white font-mono">{player.stats2026.scoringAvg}</div>
                                        </div>
                                        <div className="bg-white/5 rounded p-1 text-center">
                                            <div className="text-[9px] uppercase opacity-60">Driving</div>
                                            <div className="text-white font-mono">{player.stats2026.drivingDist}</div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/player/${player.id}`}
                                    className="mt-3 w-full py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-[10px] rounded flex items-center justify-center transition-all"
                                >
                                    Analytics <ArrowRight className="w-2.5 h-2.5 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tournament Calendar */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {tournaments.slice(0, 4).map((t, i) => {
                    // Quick parse of date string "Jan 4-7" -> Month: Jan, Days: 4-7
                    const [month, days] = t.date.split(' ');

                    return (
                        <div key={i} className="glass-panel p-0 rounded-xl overflow-hidden relative group hover:bg-slate-800/60 transition-colors">
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Flag className="w-20 h-20" />
                            </div>

                            <div className="flex h-full">
                                {/* Calendar Date Column */}
                                <div className="bg-white/5 w-16 flex flex-col items-center justify-center border-r border-white/5 p-2 text-center">
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{month}</span>
                                    <span className="text-lg font-black text-white">{days.split('-')[0]}</span>
                                    <span className="text-[10px] text-slate-500 mt-1">{t.status === 'Completed' ? 'DONE' : 'UPCOMING'}</span>
                                </div>

                                {/* Event Info */}
                                <div className="p-3 flex-1 flex flex-col justify-center z-10">
                                    <h4 className="font-bold text-sm text-white leading-tight mb-1">{t.name}</h4>
                                    <div className="text-xs text-slate-400 mb-2 truncate">{t.venue}</div>

                                    <div className="mt-auto space-y-2">
                                        {/* Favors Stat */}
                                        {t.favors && (
                                            <div className="flex items-center gap-1.5 text-[10px]">
                                                <TrendingUp className="w-3 h-3 text-yellow-500" />
                                                <span className="text-slate-400">Favors:</span>
                                                <span className="text-emerald-300 font-semibold">{t.favors}</span>
                                            </div>
                                        )}

                                        {/* Course Link */}
                                        {t.venueLink && (
                                            <a
                                                href={t.venueLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[10px] bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white px-2 py-1 rounded transition-all"
                                            >
                                                Course Info <ArrowRight className="w-2.5 h-2.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Dashboard;
