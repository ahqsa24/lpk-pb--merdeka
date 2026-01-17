import React from 'react';
import { FaGamepad, FaVideo, FaBook, FaCertificate, FaTrophy, FaStar, FaLevelUpAlt, FaInfoCircle } from 'react-icons/fa';
import { GameConstants } from '@/lib/game-constants';

export const GamificationGuide: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <FaGamepad className="text-yellow-300" /> Panduan Gamifikasi & Poin
                    </h2>
                    <p className="text-red-100 text-lg max-w-2xl leading-relaxed">
                        Kumpulkan XP sebanyak-banyaknya, naikkan levelmu, dan dapatkan sertifikat kompetensi!
                        Jadilah yang terbaik di Leaderboard LPK Merdeka.
                    </p>
                </div>
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            </div>

            {/* Cara Mendapatkan Poin */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FaStar className="text-yellow-500" /> Cara Mendapatkan XP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Video */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-lg flex items-center justify-center text-xl mb-4">
                            <FaVideo />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tonton Video</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Tonton video pembelajaran hingga selesai untuk mendapatkan poin.
                        </p>
                        <div className="text-2xl font-bold text-red-600">+{GameConstants.POINTS.VIDEO_WATCH} XP</div>
                    </div>

                    {/* E-Book */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 rounded-lg flex items-center justify-center text-xl mb-4">
                            <FaBook />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Baca E-Book</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Baca materi pembelajaran berbentuk E-Book untuk memperluas wawasanmu.
                        </p>
                        <div className="text-2xl font-bold text-blue-600">+{GameConstants.POINTS.EBOOK_READ} XP</div>
                    </div>

                    {/* Quiz */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-500 rounded-lg flex items-center justify-center text-xl mb-4">
                            <FaTrophy />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kerjakan Kuis</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Uji pemahamanmu lewat kuis mingguan. Jawaban benar memberimu poin ekstra!
                        </p>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                <span>Per Soal Benar</span>
                                <span className="text-purple-600">+{GameConstants.POINTS.QUIZ_CORRECT_ANSWER} XP</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                <span>Nilai Sempurna (100)</span>
                                <span className="text-purple-600">+{GameConstants.POINTS.QUIZ_PERFECT_SCORE_BONUS} XP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Level System */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-8 border border-blue-100 dark:border-zinc-700">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaLevelUpAlt className="text-indigo-500" /> Sistem Level
                    </h3>
                    <p className="text-indigo-700 dark:text-gray-300 mb-6 leading-relaxed">
                        Setiap <span className="font-bold">{GameConstants.LEVELING.XP_PER_LEVEL} XP</span> yang kamu kumpulkan akan menaikkan Level akun kamu. Semakin tinggi levelmu, semakin prestisius statusmu di komunitas LPK Merdeka!
                    </p>
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-indigo-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className="h-2 flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-3/4"></div>
                        </div>
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Level Up!</span>
                    </div>
                </div>

                {/* Sertifikat */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-8 border border-yellow-100 dark:border-zinc-700">
                    <h3 className="text-xl font-bold text-yellow-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaCertificate className="text-yellow-600" /> Sertifikat Kompetensi
                    </h3>
                    <p className="text-yellow-800 dark:text-gray-300 mb-6 leading-relaxed">
                        Dapatkan sertifikat resmi setiap kali kamu menyelesaikan Kuis Mingguan dengan nilai minimal <span className="font-bold">{GameConstants.CERTIFICATES.PASSING_SCORE}</span>.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-yellow-900 dark:text-gray-300">
                            <FaInfoCircle className="mt-1 text-yellow-600 flex-shrink-0" />
                            <span>Sertifikat dapat diunduh kapan saja di menu "Sertifikat".</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-yellow-900 dark:text-gray-300">
                            <FaInfoCircle className="mt-1 text-yellow-600 flex-shrink-0" />
                            <span>Jika nama di sertifikat salah, kamu bisa memperbaruinya dengan tombol "Regenerate".</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
