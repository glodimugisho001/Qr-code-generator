"use client";

import { useState } from "react";
import {
  ContactIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  SparklesIcon,
  TextIcon,
  WifiIcon,
} from "./Icons";

export type QRContentType = "url" | "text" | "wifi" | "email" | "vcard" | "sms";

interface InputTabsProps {
  contentType: QRContentType;
  onContentTypeChange: (type: QRContentType) => void;
  onPayloadChange: (payload: string, label: string) => void;
}

export function InputTabs({
  contentType,
  onContentTypeChange,
  onPayloadChange,
}: InputTabsProps) {
  // URL state
  const [url, setUrl] = useState("https://antigravity.google.com");

  // Text state
  const [text, setText] = useState("Bonjour le monde ! Bienvenue sur mon QR Code.");

  // WiFi state
  const [wifiSsid, setWifiSsid] = useState("MonSuperWiFi");
  const [wifiPassword, setWifiPassword] = useState("motdepasse123");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  // Email state
  const [emailTo, setEmailTo] = useState("contact@exemple.com");
  const [emailSubject, setEmailSubject] = useState("Demande d'information");
  const [emailBody, setEmailBody] = useState("Bonjour, je vous contacte suite à votre QR code.");

  // vCard state
  const [vcardName, setVcardName] = useState("Alexandre Martin");
  const [vcardPhone, setVcardPhone] = useState("+33 6 12 34 56 78");
  const [vcardEmail, setVcardEmail] = useState("alexandre@tech.fr");
  const [vcardOrg, setVcardOrg] = useState("Studio Digital");
  const [vcardUrl, setVcardUrl] = useState("https://portfolio.dev");

  // SMS state
  const [smsPhone, setSmsPhone] = useState("+33 6 98 76 54 32");
  const [smsMessage, setSmsMessage] = useState("Bonjour, voici mon contact !");

  // Generate payload whenever any field changes
  const updateUrl = (val: string) => {
    setUrl(val);
    onPayloadChange(val, `URL: ${val}`);
  };

  const updateText = (val: string) => {
    setText(val);
    onPayloadChange(val, `Texte (${val.length} car.)`);
  };

  const updateWifi = (
    ssid = wifiSsid,
    pass = wifiPassword,
    enc = wifiEncryption,
    hidden = wifiHidden
  ) => {
    // Format: WIFI:T:WPA;S:MySSID;P:MyPassword;H:false;;
    const payload = `WIFI:T:${enc};S:${ssid};P:${enc === "nopass" ? "" : pass};H:${hidden ? "true" : "false"};;`;
    onPayloadChange(payload, `Wi-Fi: ${ssid}`);
  };

  const updateEmail = (to = emailTo, subj = emailSubject, body = emailBody) => {
    const params = new URLSearchParams();
    if (subj) params.append("subject", subj);
    if (body) params.append("body", body);
    const query = params.toString();
    const payload = `mailto:${to}${query ? `?${query}` : ""}`;
    onPayloadChange(payload, `Email: ${to}`);
  };

  const updateVCard = (
    name = vcardName,
    phone = vcardPhone,
    mail = vcardEmail,
    org = vcardOrg,
    site = vcardUrl
  ) => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
      phone ? `TEL;TYPE=CELL:${phone}` : "",
      mail ? `EMAIL:${mail}` : "",
      org ? `ORG:${org}` : "",
      site ? `URL:${site}` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
    onPayloadChange(vcard, `Contact: ${name}`);
  };

  const updateSms = (phone = smsPhone, message = smsMessage) => {
    const payload = `smsto:${phone}:${message}`;
    onPayloadChange(payload, `SMS: ${phone}`);
  };

  const tabs = [
    { id: "url" as const, label: "Lien URL", icon: LinkIcon },
    { id: "text" as const, label: "Texte", icon: TextIcon },
    { id: "wifi" as const, label: "Wi-Fi", icon: WifiIcon },
    { id: "email" as const, label: "E-mail", icon: MailIcon },
    { id: "vcard" as const, label: "Contact", icon: ContactIcon },
    { id: "sms" as const, label: "SMS", icon: PhoneIcon },
  ];

  const handleTabClick = (type: QRContentType) => {
    onContentTypeChange(type);
    if (type === "url") updateUrl(url);
    else if (type === "text") updateText(text);
    else if (type === "wifi") updateWifi();
    else if (type === "email") updateEmail();
    else if (type === "vcard") updateVCard();
    else if (type === "sms") updateSms();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md space-y-5">
      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = contentType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {/* URL Content */}
        {contentType === "url" && (
          <div className="space-y-3">
            <div>
              <label htmlFor="input-url" className="block text-xs font-medium text-slate-300 mb-1.5">
                Adresse URL du site web
              </label>
              <div className="relative">
                <input
                  id="input-url"
                  type="url"
                  placeholder="https://mon-site.fr"
                  value={url}
                  onChange={(e) => updateUrl(e.target.value)}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Quick URL Suggestions */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <SparklesIcon className="w-3 h-3 text-amber-400" />
                Suggestions :
              </span>
              {[
                { label: "Portfolio", link: "https://mon-portfolio.dev" },
                { label: "Instagram", link: "https://instagram.com/moncompte" },
                { label: "Menu Resto", link: "https://mon-resto.com/menu" },
                { label: "Google", link: "https://google.com" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => updateUrl(item.link)}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/5 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Content */}
        {contentType === "text" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-text" className="text-xs font-medium text-slate-300">
                Message ou texte personnalisé
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {text.length} caractères
              </span>
            </div>
            <textarea
              id="input-text"
              rows={4}
              placeholder="Écrivez le message qui s'affichera lors du scan..."
              value={text}
              onChange={(e) => updateText(e.target.value)}
              className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            />
          </div>
        )}

        {/* Wi-Fi Content */}
        {contentType === "wifi" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="wifi-ssid" className="block text-xs font-medium text-slate-300 mb-1">
                  Nom du réseau (SSID)
                </label>
                <input
                  id="wifi-ssid"
                  type="text"
                  placeholder="Ex: Maison_5G"
                  value={wifiSsid}
                  onChange={(e) => {
                    setWifiSsid(e.target.value);
                    updateWifi(e.target.value, wifiPassword, wifiEncryption, wifiHidden);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="wifi-pass" className="text-xs font-medium text-slate-300">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowWifiPassword(!showWifiPassword)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300"
                  >
                    {showWifiPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
                <input
                  id="wifi-pass"
                  type={showWifiPassword ? "text" : "password"}
                  placeholder="Clé de sécurité"
                  value={wifiPassword}
                  disabled={wifiEncryption === "nopass"}
                  onChange={(e) => {
                    setWifiPassword(e.target.value);
                    updateWifi(wifiSsid, e.target.value, wifiEncryption, wifiHidden);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 disabled:opacity-40 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="wifi-enc" className="block text-xs font-medium text-slate-300 mb-1">
                  Sécurité / Chiffrement
                </label>
                <select
                  id="wifi-enc"
                  value={wifiEncryption}
                  onChange={(e) => {
                    const enc = e.target.value as "WPA" | "WEP" | "nopass";
                    setWifiEncryption(enc);
                    updateWifi(wifiSsid, wifiPassword, enc, wifiHidden);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Ancien)</option>
                  <option value="nopass">Aucun (Réseau ouvert)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => {
                      setWifiHidden(e.target.checked);
                      updateWifi(wifiSsid, wifiPassword, wifiEncryption, e.target.checked);
                    }}
                    className="rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Réseau masqué (Hidden SSID)</span>
                </label>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg">
              💡 Les smartphones qui scannent ce QR code se connecteront automatiquement à votre Wi-Fi sans taper le mot de passe !
            </p>
          </div>
        )}

        {/* Email Content */}
        {contentType === "email" && (
          <div className="space-y-3">
            <div>
              <label htmlFor="email-to" className="block text-xs font-medium text-slate-300 mb-1">
                Adresse e-mail du destinataire
              </label>
              <input
                id="email-to"
                type="email"
                placeholder="contact@entreprise.com"
                value={emailTo}
                onChange={(e) => {
                  setEmailTo(e.target.value);
                  updateEmail(e.target.value, emailSubject, emailBody);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email-subject" className="block text-xs font-medium text-slate-300 mb-1">
                Objet du message
              </label>
              <input
                id="email-subject"
                type="text"
                placeholder="Prise de rendez-vous..."
                value={emailSubject}
                onChange={(e) => {
                  setEmailSubject(e.target.value);
                  updateEmail(emailTo, e.target.value, emailBody);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email-body" className="block text-xs font-medium text-slate-300 mb-1">
                Corps du message (pré-rempli)
              </label>
              <textarea
                id="email-body"
                rows={2}
                placeholder="Bonjour..."
                value={emailBody}
                onChange={(e) => {
                  setEmailBody(e.target.value);
                  updateEmail(emailTo, emailSubject, e.target.value);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* vCard Content */}
        {contentType === "vcard" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="vcard-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Nom complet
                </label>
                <input
                  id="vcard-name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={vcardName}
                  onChange={(e) => {
                    setVcardName(e.target.value);
                    updateVCard(e.target.value, vcardPhone, vcardEmail, vcardOrg, vcardUrl);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="vcard-phone" className="block text-xs font-medium text-slate-300 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  id="vcard-phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={vcardPhone}
                  onChange={(e) => {
                    setVcardPhone(e.target.value);
                    updateVCard(vcardName, e.target.value, vcardEmail, vcardOrg, vcardUrl);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="vcard-email" className="block text-xs font-medium text-slate-300 mb-1">
                  Email
                </label>
                <input
                  id="vcard-email"
                  type="email"
                  placeholder="jean@gmail.com"
                  value={vcardEmail}
                  onChange={(e) => {
                    setVcardEmail(e.target.value);
                    updateVCard(vcardName, vcardPhone, e.target.value, vcardOrg, vcardUrl);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="vcard-org" className="block text-xs font-medium text-slate-300 mb-1">
                  Entreprise / Titre
                </label>
                <input
                  id="vcard-org"
                  type="text"
                  placeholder="Développeur Web"
                  value={vcardOrg}
                  onChange={(e) => {
                    setVcardOrg(e.target.value);
                    updateVCard(vcardName, vcardPhone, vcardEmail, e.target.value, vcardUrl);
                  }}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="vcard-url" className="block text-xs font-medium text-slate-300 mb-1">
                Site Web ou Profil
              </label>
              <input
                id="vcard-url"
                type="url"
                placeholder="https://mon-portfolio.fr"
                value={vcardUrl}
                onChange={(e) => {
                  setVcardUrl(e.target.value);
                  updateVCard(vcardName, vcardPhone, vcardEmail, vcardOrg, e.target.value);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* SMS Content */}
        {contentType === "sms" && (
          <div className="space-y-3">
            <div>
              <label htmlFor="sms-phone" className="block text-xs font-medium text-slate-300 mb-1">
                Numéro de téléphone
              </label>
              <input
                id="sms-phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={smsPhone}
                onChange={(e) => {
                  setSmsPhone(e.target.value);
                  updateSms(e.target.value, smsMessage);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="sms-message" className="block text-xs font-medium text-slate-300 mb-1">
                Message SMS
              </label>
              <textarea
                id="sms-message"
                rows={3}
                placeholder="Tapez le message à envoyer par SMS..."
                value={smsMessage}
                onChange={(e) => {
                  setSmsMessage(e.target.value);
                  updateSms(smsPhone, e.target.value);
                }}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
