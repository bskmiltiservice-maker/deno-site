import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Heart, Clock } from 'lucide-react';
import { PageRoute } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { useToast } from '../../context/ToastContext';
import { sendContactMessage } from '../../lib/api';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'question-produit',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Champs incomplets', 'Merci de renseigner tous les champs obligatoires.', 'warning');
      return;
    }
    setIsSending(true);
    await sendContactMessage(formData);
    setIsSending(false);
    setSubmitted(true);
    addToast('Message bien reçu !', 'Nous vous répondrons avec attention sous 24 heures ouvrées.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Contact', active: true },
        ]}
      />

      <div className="my-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          À votre écoute
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
          Contactez l&apos;équipe Maison Terroir
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Une interrogation sur une matière, une commande chez l&apos;un de nos artisans partenaires, ou une envie de collaboration ? Écrivez-nous.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info & Reassurance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="font-heading text-xl font-bold text-white">
              Une relation simple et attentionnée
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Chez nous, pas de répondeur automatisé ni de ticket sans fin. Vous dialoguez directement avec les fondateurs du projet.
            </p>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#F97316]" />
                </div>
                <span>Réponse sous 24h ouvrées garantie</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F97316]" />
                </div>
                <span>bonjour@maison-terroir.eu</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F97316]" />
                </div>
                <span>Bureau éditorial : Lyon (France) & Borås (Suède)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft text-xs text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Vous êtes artisan européen ?</span>
            </p>
            <p>
              Nous sommes toujours à la recherche d&apos;ateliers d&apos;exception travaillant le bois, le textile naturel, la céramique ou le verre. Envoyez-nous un aperçu de vos créations !
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Merci {formData.name} !
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Votre message a bien été transmis. Nous y répondrons avec tout le soin mérité par email à{' '}
                <strong className="text-slate-800">{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'question-produit', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Votre prénom et nom <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex. Éléonore Martin"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Votre adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="eleonore@exemple.fr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Objet de votre message
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="question-produit">Question sur un objet ou une matière</option>
                  <option value="suivi-commande">Assistance sur une commande d&apos;atelier</option>
                  <option value="partenariat">Je suis artisan et souhaite proposer mes créations</option>
                  <option value="autre">Autre mot doux ou suggestion</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Votre message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Écrivez-nous en quelques phrases simples..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-soft transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer mon message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
