
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

            {/* Secondary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {tournaments.slice(0, 4).map((t, i) => (
                    <div key={i} className="glass-panel p-4 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Flag className="w-12 h-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-xs text-slate-500 uppercase font-mono">{t.date}</div>
                                <div className={`px-2 py-0.5 rounded text-[10px] border ${t.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                                    {t.status}
                                </div>
                            </div>
                            <div className="font-bold text-sm mb-1">{t.name}</div>
                            <div className="text-xs text-slate-400 mb-3">{t.venue}</div>

                            {/* Course Analysis Badge */}
                            {t.favors && (
                                <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-700/50 border border-slate-600">
                                    <TrendingUp className="w-3 h-3 text-yellow-500" />
                                    <span className="text-[10px] text-slate-300">Favors: <span className="text-white font-semibold">{t.favors}</span></span>
                                </div>
                            )}

                            {t.venueLink && (
                                <a
                                    href={t.venueLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                    Course Info <ArrowRight className="w-2.5 h-2.5" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;
