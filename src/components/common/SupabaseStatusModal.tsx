import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, X, ExternalLink, Code } from 'lucide-react';
import { checkSupabaseConnection, SUPABASE_URL, SUPABASE_SQL_SCHEMA } from '../../lib/supabase';
import { seedSupabaseDatabase } from '../../lib/api';
import { useToast } from '../../context/ToastContext';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseStatusModal: React.FC<SupabaseStatusModalProps> = ({ isOpen, onClose }) => {
  const [checking, setChecking] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);
  const [status, setStatus] = useState<{
    connected: boolean;
    message: string;
    hasTables?: boolean;
  } | null>(null);

  const { addToast } = useToast();

  const runCheck = async () => {
    setChecking(true);
    const res = await checkSupabaseConnection();
    setStatus(res);
    setChecking(false);
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    addToast('Script SQL copié !', 'Collez-le dans le SQL Editor de votre projet Supabase.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSeed = async () => {
    setSeeding(true);
    const res = await seedSupabaseDatabase();
    setSeeding(false);
    if (res.success) {
      addToast('Synchronisation réussie', res.message, 'success');
      runCheck();
    } else {
      addToast('Information', res.message, 'warning');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg z-10 border border-slate-200 max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Statut Supabase"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                Base de données PostgreSQL / Supabase
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Connexion au projet &laquo; site beno &raquo;
              </h3>
            </div>
          </div>

          {/* Connection Details Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3 mb-6 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Nom du projet :</span>
              <span className="font-semibold text-slate-900">site beno</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Identifiant Projet (ID) :</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-xs">
                gnlewlhthhricqqfhbzs
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">URL de l&apos;API :</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px] truncate max-w-[260px] sm:max-w-none">
                {SUPABASE_URL}
              </code>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">État du connecteur :</span>
              <div className="flex items-center gap-1.5 font-medium">
                {checking ? (
                  <span className="flex items-center gap-1 text-slate-500">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Test en cours...
                  </span>
                ) : status?.connected ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> {status.message}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <AlertCircle className="w-4 h-4" /> {status?.message || 'Vérification...'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions & Seed */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={runCheck}
                disabled={checking}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                <span>Tester la connexion</span>
              </button>

              <button
                onClick={handleSeed}
                disabled={seeding}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{seeding ? 'Synchronisation...' : 'Synchroniser les données dans Supabase'}</span>
              </button>

              <button
                onClick={() => setShowSql(!showSql)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showSql ? 'Masquer le script SQL' : 'Voir le script SQL complet'}</span>
              </button>
            </div>

            {/* SQL Script Viewer */}
            {showSql && (
              <div className="mt-4 bg-slate-900 text-slate-200 rounded-2xl p-4 text-xs font-mono overflow-x-auto relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>Schéma Supabase (suppliers, categories, products, reviews, contact)</span>
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-sans font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié' : 'Copier tout le SQL'}</span>
                  </button>
                </div>
                <pre className="max-h-60 overflow-y-auto leading-relaxed">{SUPABASE_SQL_SCHEMA}</pre>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              La boutique fonctionne en temps réel avec Supabase (avec secours automatique vers le jeu de données local).
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
