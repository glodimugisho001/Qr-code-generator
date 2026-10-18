"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Comment générer un QR Code gratuitement sur QR Pulse ?",
    answer:
      "Sélectionnez simplement l'onglet correspondant à votre besoin (Lien URL, Wi-Fi, vCard, Email, SMS ou Texte), entrez vos informations, personnalisez les couleurs si vous le souhaitez et téléchargez votre QR Code instantanément en PNG haute définition ou SVG vectoriel. Aucune inscription ni carte bancaire n'est requise.",
  },
  {
    question:
      "Comment fonctionne le QR Code Wi-Fi pour se connecter sans mot de passe ?",
    answer:
      "En saisissant le nom de votre réseau (SSID) et sa clé de sécurité, QR Pulse génère un QR code respectant le standard universel Wi-Fi. Dès qu'un invité scanne le code avec l'appareil photo de son smartphone (iOS ou Android), l'appareil propose automatiquement de rejoindre le réseau sans aucune saisie manuelle.",
  },
  {
    question: "Quel format d'export privilégier entre PNG et SVG ?",
    answer:
      "Le format PNG haute résolution (jusqu'à 2048px) est parfait pour une diffusion sur écrans, sites web, réseaux sociaux ou documents Word / PDF. Le format SVG est un fichier vectoriel à redimensionnement infini, recommandé pour les graphistes et les imprimeurs professionnels (packaging, kakemonos, vitrines, flyers).",
  },
  {
    question:
      "Mes données ou mots de passe sont-ils stockés sur vos serveurs ?",
    answer:
      "Absolument pas. Tout le traitement d'encodage du QR code s'effectue en temps réel directement dans votre navigateur web via JavaScript. Aucune information (ni texte, ni URL, ni mot de passe Wi-Fi) n'est envoyée ni sauvegardée sur nos serveurs.",
  },
  {
    question:
      "Les QR codes générés ont-ils une durée de validité ou limite de scans ?",
    answer:
      "Non, il s'agit de QR codes statiques. L'information étant inscrite dans la matrice graphique elle-même, vos QR codes fonctionnent à vie sans aucune date d'expiration et sans limitation de scans.",
  },
  {
    question: "Puis-je utiliser ces QR codes à des fins commerciales ?",
    answer:
      "Oui, vous êtes 100% propriétaire de vos créations. Vous pouvez les imprimer librement sur vos produits, menus, enseignes, affiches ou cartes de visite professionnelles.",
  },
];

const USE_CASES = [
  {
    icon: "📶",
    title: "Wi-Fi Simple & Invités",
    desc: "Permettez à vos clients ou amis de se connecter à votre box ou point d'accès en scannant simplement le QR code.",
  },
  {
    icon: "📇",
    title: "Cartes de Visite (vCard)",
    desc: "Transmettez votre nom, numéro, e-mail et entreprise directement dans les contacts du smartphone de votre interlocuteur.",
  },
  {
    icon: "🍽️",
    title: "Menus de Restaurants",
    desc: "Offrez un accès rapide et sans contact à vos cartes, menus du jour et réservations en ligne.",
  },
  {
    icon: "🎯",
    title: "Campagnes Marketing",
    desc: "Insérez vos QR codes sur vos flyers, emballages et affiches avec un format vectoriel SVG prêt pour l'impression.",
  },
];

export function SEOContentSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-16 pt-8 border-t border-white/5">
      {/* Cas d'usage */}
      <section className="space-y-6" aria-labelledby="usecases-heading">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2
            id="usecases-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
          >
            Tous les formats pour chaque besoin
          </h2>
          <p className="text-sm text-slate-400">
            Une compatibilité universelle avec tous les smartphones modernes iOS
            et Android.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USE_CASES.map((uc) => (
            <article
              key={uc.title}
              className="p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-indigo-500/30 transition-all space-y-2.5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                {uc.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-100">
                {uc.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {uc.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Guide Technique et Correction d'erreur */}
      <section className="space-y-6" aria-labelledby="guide-heading">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-purple-950/20 border border-indigo-500/20 space-y-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Conseils professionnels
            </span>
            <h2
              id="guide-heading"
              className="text-xl sm:text-2xl font-bold text-white"
            >
              Comment optimiser la lisibilité de vos QR Codes ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pour garantir un scan rapide et sans faille, même en conditions de
              faible luminosité ou à distance :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <span className="text-indigo-400 font-semibold text-xs">
                Contraste Élevé
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Préférez un premier plan sombre sur un arrière-plan clair pour
                une détection optique instantanée par l'objectif photo.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <span className="text-indigo-400 font-semibold text-xs">
                Zone de Silence (Marge)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conservez une marge minimale de 2 à 4 modules autour du code
                afin d'isoler le motif visuel de son environnement graphique.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <span className="text-indigo-400 font-semibold text-xs">
                Correction d'Erreur (L, M, Q, H)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilisez le niveau <strong>M (15%)</strong> par défaut, ou{" "}
                <strong>H (30%)</strong> si vos codes sont exposés à des
                salissures ou aux intempéries extérieures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Foire Aux Questions (FAQ) */}
      <section
        className="space-y-6 max-w-4xl mx-auto"
        aria-labelledby="faq-heading"
      >
        <div className="text-center space-y-2">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
          >
            Foire Aux Questions (FAQ)
          </h2>
          <p className="text-sm text-slate-400">
            Toutes les réponses à vos questions sur la création et l'usage de
            vos QR Codes.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-200">
                    {item.question}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <section
                    id={`faq-answer-${index}`}
                    aria-labelledby={`faq-btn-${index}`}
                    className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5"
                  >
                    {item.answer}
                  </section>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
