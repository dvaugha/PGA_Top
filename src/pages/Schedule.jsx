
import React from 'react';
import { Link } from 'react-router-dom';
import { tournaments } from '../data/golfData';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Calendar } from 'lucide-react';

const Schedule = () => {
    const [visibleCount, setVisibleCount] = React.useState(9);
    const [isUpdating, setIsUpdating] = React.useState(false);

    const handleUpdate = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setVisibleCount(tournaments.length);
            setIsUpdating(false);
        }, 800);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">2026 Tour Schedule</h1>
                {visibleCount < tournaments.length && (
                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-6 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Calendar className="w-5 h-5" />
                                Update Schedule
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournaments.slice(0, visibleCount).map((evt, index) => (
                    <Link to={`/tournament/${evt.id}`} key={evt.id} className="block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`glass-panel p-5 rounded-xl flex flex-col justify-between h-full relative overflow-hidden border-t-4 ${evt.status === 'Completed' ? 'border-t-emerald-500' : evt.status === 'Canceled' ? 'border-t-red-500' : 'border-t-blue-500'
                                } hover:bg-white/5 transition-colors`}
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${evt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                        evt.status === 'Canceled' ? 'bg-red-500/10 text-red-400' :
                                            'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {evt.status}
                                    </span>
                                    <div className="flex items-center text-slate-400">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        <span className="text-xs font-mono">{evt.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{evt.name}</h3>
                                <div className="flex items-center text-slate-400 text-xs">
                                    <MapPin className="w-3 h-3 mr-1" /> {evt.venue || evt.location}
                                </div>
                            </div>

                            {evt.status === 'Completed' ? (
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Winner</div>
                                    <div className="flex justify-between items-end">
                                        <div className="font-bold text-base text-yellow-500 flex items-center gap-1">
                                            <Trophy className="w-4 h-4" /> {evt.winner}
                                        </div>
                                        <div className="text-lg font-mono font-bold text-emerald-400">{evt.score}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-slate-500">Purse</div>
                                        <div className="text-sm font-mono text-white">{evt.purse || 'TBD'}</div>
                                    </div>
                                    {evt.favors && (
                                        <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            Favors: <span className="text-slate-300">{evt.favors}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </Link>
                ))}
            </div>

            {visibleCount < tournaments.length && (
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm mb-4">Showing {visibleCount} of {tournaments.length} events</p>
                </div>
            )}
        </div>
    );
};

export default Schedule;
