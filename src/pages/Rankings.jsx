
import React from 'react';
import { players } from '../data/golfData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Rankings = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Official World Golf Ranking <span className="text-emerald-500">2026</span></h1>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-800/50 text-left text-slate-400 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Rank</th>
                                <th className="p-4">Player</th>
                                <th className="p-4">Country</th>
                                <th className="p-4 text-right">Points</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {players.sort((a, b) => a.rank - b.rank).map((player, index) => (
                                <motion.tr
                                    key={player.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="p-4 font-bold text-lg w-16 text-center">{player.rank}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
                                                <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-semibold text-white">{player.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-400">{player.country}</td>
                                    <td className="p-4 text-right font-mono text-emerald-400">{player.stats2026.points}</td>
                                    <td className="p-4 text-right">
                                        <Link to={`/player/${player.id}`} className="text-xs btn btn-outline py-1 px-3">
                                            Analytics
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Rankings;
