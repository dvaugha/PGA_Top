import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Trophy, Target, TrendingUp, Users } from 'lucide-react';
import { tournaments, players } from '../data/golfData';
import { motion } from 'framer-motion';

const TournamentDetail = () => {
    const { id } = useParams();
    const tournament = tournaments.find(t => t.id === parseInt(id));

    if (!tournament) return <div>Tournament not found</div>;

    // Simulate "Field" based on generic rankings mainly for demo
    // In a real app, this would come from a "field" array in the tournament data
    const projectedField = players.slice(0, 8);

    // Simple "Course Fit" Algorithm
    const getFitScore = (player) => {
        if (!tournament.favors) return 85; // Base score
        // Only checking 2 stats for simplicity
        if (tournament.favors.includes("Driving") && player.stats2026.drivingDist > 310) return 98;
        if (tournament.favors.includes("Putting") && player.stats2026.sgTotal > 2.0) return 95;
        if (tournament.favors.includes("Accuracy") && player.stats2026.drivingDist < 300) return 94;
        return 88;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            {/* Header */}
            <div className="glass-panel p-8 rounded-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Trophy className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold border border-emerald-500/30">
                            {tournament.status}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                            <Calendar className="w-4 h-4" /> {tournament.date}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{tournament.name}</h1>
                    <div className="flex items-center gap-2 text-xl text-slate-300">
                        <MapPin className="w-5 h-5 text-blue-400" /> {tournament.venue}
                    </div>
                    {tournament.venueLink && (
                        <a href={tournament.venueLink} target="_blank" className="inline-block mt-4 text-emerald-400 hover:underline">
                            View Official Course Guide &rarr;
                        </a>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Course Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-400" /> Course Profile
                        </h3>

                        {tournament.courseInfo ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                        <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Par</div>
                                        <div className="text-3xl font-mono font-bold">{tournament.courseInfo.par}</div>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                        <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Yardage</div>
                                        <div className="text-3xl font-mono font-bold text-blue-400">{tournament.courseInfo.yards}</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-300 mb-2">Designer</h4>
                                    <p className="text-slate-400 mb-4">{tournament.courseInfo.designer}</p>

                                    <h4 className="font-semibold text-slate-300 mb-2">Overview</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {tournament.courseInfo.description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-500 italic">Course data pending for this event...</div>
                        )}
                    </div>
                </div>

                {/* Right Col: Field Analysis */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-yellow-400" /> Projected Top Fits
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">
                            Players whose stats best match this course's "Favors" profile: <span className="text-white font-bold">{tournament.favors}</span>
                        </p>

                        <div className="space-y-3">
                            {projectedField.map(player => {
                                const score = getFitScore(player);
                                return (
                                    <div key={player.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <img src={player.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                                            <div>
                                                <div className="font-bold text-sm">{player.name}</div>
                                                <div className="text-[10px] text-slate-400">Rank #{player.rank}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-black text-emerald-400">{score}%</div>
                                            <div className="text-[9px] uppercase text-slate-500">Fit</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentDetail;
