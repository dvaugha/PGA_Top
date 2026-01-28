
import React from 'react';
import { tournaments } from '../data/golfData';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Calendar } from 'lucide-react';

const Schedule = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">2026 Tour Schedule</h1>

            <div className="grid grid-cols-1 gap-6">
                {tournaments.map((evt, index) => (
                    <motion.div
                        key={evt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass-panel p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 border-l-4 ${evt.status === 'Completed' ? 'border-l-emerald-500' : evt.status === 'Canceled' ? 'border-l-red-500' : 'border-l-blue-500'
                            }`}
                    >
                        <div className="flex flex-col items-center md:items-start min-w-[120px]">
                            <div className="flex items-center text-slate-400 mb-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="text-sm">{evt.date}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${evt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                    evt.status === 'Canceled' ? 'bg-red-500/10 text-red-400' :
                                        'bg-blue-500/10 text-blue-400'
                                }`}>
                                {evt.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold mb-1">{evt.name}</h3>
                            <div className="flex items-center justify-center md:justify-start text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 mr-1" /> {evt.location}
                            </div>
                        </div>

                        {evt.status === 'Completed' && (
                            <div className="text-right min-w-[150px]">
                                <div className="text-sm text-slate-400 mb-1">Winner</div>
                                <div className="font-bold text-lg text-yellow-500 flex items-center justify-end gap-2">
                                    <Trophy className="w-4 h-4" /> {evt.winner}
                                </div>
                                <div className="text-sm font-mono text-emerald-400">{evt.score}</div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
