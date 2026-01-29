
import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link
import { players } from '../data/golfData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const PlayerDetail = () => {
    const { id } = useParams();
    const player = players.find(p => p.id === parseInt(id));

    if (!player) {
        return <div className="text-center py-20">Player not found</div>;
    }

    // Comparison Data
    const comparisonData = [
        { name: 'Scoring Avg', '2025': player.stats2025.scoringAvg, '2026': player.stats2026.scoringAvg },
        { name: 'Driving Dist', '2025': player.stats2025.drivingDist, '2026': player.stats2026.drivingDist },
        { name: 'SG: Total', '2025': player.stats2025.sgTotal, '2026': player.stats2026.sgTotal },
    ];

    // Normalize for chart (since units differ) - Actually better to separate charts or just show absolute
    // Let's do a pure Scoring Chart and Driving Chart side by side for comparison

    const scoringData = [
        { name: 'Scoring Average', '2025': player.stats2025.scoringAvg, '2026': player.stats2026.scoringAvg },
    ];

    const drivingData = [
        { name: 'Driving Distance', '2025': player.stats2025.drivingDist, '2026': player.stats2026.drivingDist },
    ];

    // Radar for Skills (Mocked strictly for visuals)
    const skillsData = [
        { subject: 'Driving', A: 90, fullMark: 100 },
        { subject: 'Approach', A: 85, fullMark: 100 },
        { subject: 'Putting', A: 70, fullMark: 100 },
        { subject: 'Scrambling', A: 80, fullMark: 100 },
        { subject: 'Mental', A: 95, fullMark: 100 },
        { subject: 'Fitness', A: 88, fullMark: 100 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            {/* Header Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card p-8 mb-8 flex flex-col md:flex-row gap-8 items-center"
            >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-500/20 shadow-2xl">
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold">{player.name}</h1>
                        <span className="bg-emerald-500 text-black text-sm font-bold px-3 py-1 rounded-full">#{player.rank}</span>
                    </div>
                    <p className="text-xl text-slate-400 mb-4">{player.country}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-slate-400">Net Worth:</span>
                            <span className="font-bold text-white">{player.netWorth}</span>
                        </div>
                        {player.contracts.map(contract => (
                            <div key={contract} className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700 text-sm text-slate-300">
                                {contract}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Key Stats */}
                <div className="glass-panel p-6 rounded-xl space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-emerald-400" /> Season Stats (2026)
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">Scoring Avg</span>
                            <span className="text-xl font-mono font-bold">{player.stats2026.scoringAvg}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">Driving Dist</span>
                            <span className="text-xl font-mono font-bold text-blue-400">{player.stats2026.drivingDist}y</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">SG: Total</span>
                            <span className="text-xl font-mono font-bold text-emerald-400">+{player.stats2026.sgTotal}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">FedEx Cup Points</span>
                            <span className="text-xl font-mono font-bold text-yellow-500">{player.stats2026.points}</span>
                        </div>
                    </div>
                </div>

                {/* Comparison Charts */}
                <div className="glass-panel p-6 rounded-xl col-span-1 lg:col-span-2">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-400" /> 2026 vs 2025 Performance
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoringData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" domain={[65, 72]} hide />
                                <YAxis dataKey="name" type="category" hide />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                <Legend />
                                <Bar dataKey="2025" fill="#3b82f6" name="2025 Avg" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="2026" fill="#10b981" name="2026 Avg" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={drivingData} layout="vertical">
                                <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" domain={[280, 340]} hide />
                                <YAxis dataKey="name" type="category" hide />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                <Legend />
                                <Bar dataKey="2025" fill="#3b82f6" name="2025 Dist" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="2026" fill="#10b981" name="2026 Dist" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-4">*Scoring: Lower is better. Driving: Higher is better.</p>
                </div>
            </div>

            {/* Recent Activity */}
            <h3 className="text-2xl font-bold mb-6">Recent Season Results</h3>
            <div className="glass-panel overflow-hidden rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-medium">Tournament</th>
                            <th className="p-4 font-medium">Position</th>
                            <th className="p-4 font-medium text-right">Score</th>
                            <th className="p-4 font-medium text-right text-emerald-400">Winnings</th>
                            <th className="p-4 font-medium text-right text-red-400">Tax (Est)</th>
                            <th className="p-4 font-medium text-right text-white">Net</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {player.recentResults.length > 0 ? (
                            player.recentResults.map((result, idx) => {
                                // Basic parsing for clean calculation
                                const rawEarnings = result.earnings ? parseInt(result.earnings.replace(/[$,]/g, '')) || 0 : 0;
                                const estTax = Math.floor(rawEarnings * 0.45); // Approx 45% tax
                                const netEarnings = rawEarnings - estTax;

                                return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">{result.event}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${result.position === '1' ? 'bg-yellow-500/20 text-yellow-500' :
                                                result.position.startsWith('T') && parseInt(result.position.substring(1)) <= 10 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                                                }`}>
                                                {result.position}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-mono text-slate-300">{result.score}</td>
                                        <td className="p-4 text-right font-mono text-emerald-400 font-bold">
                                            {result.earnings || '-'}
                                        </td>
                                        <td className="p-4 text-right font-mono text-red-400 text-xs">
                                            {rawEarnings > 0 ? `-$${estTax.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="p-4 text-right font-mono font-bold text-white">
                                            {rawEarnings > 0 ? `$${netEarnings.toLocaleString()}` : '-'}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-slate-500">No results recorded yet for 2026.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bag Analysis Section */}
            {player.clubDistances && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-400" /> Bag Analysis & Yardages
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {Object.entries(player.clubDistances).map(([club, yardage]) => (
                            <div key={club} className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex flex-col items-center justify-center hover:border-emerald-500/50 transition-colors">
                                <div className="text-slate-400 text-xs uppercase font-bold mb-1">{club}</div>
                                <div className="text-xl font-black text-white">{yardage}</div>
                                <div className="text-[9px] text-slate-500">yards</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};
import { Activity, Target } from 'lucide-react'; // Updated import

export default PlayerDetail;
