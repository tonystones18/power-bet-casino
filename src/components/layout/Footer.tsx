"use client";

import Link from "next/link";
import { Zap, Shield, Phone, Mail } from "lucide-react";

const footerLinks = {
  Games: [
    { label: "Casino", href: "/casino" },
    { label: "Live Casino", href: "/live-casino" },
    { label: "Sports Betting", href: "/sports" },
    { label: "Crash Games", href: "/crash" },
    { label: "Poker", href: "/poker" },
    { label: "Tournaments", href: "/tournaments" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Partners", href: "/partners" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Live Chat", href: "/chat" },
    { label: "Contact Us", href: "/contact" },
    { label: "Responsible Gambling", href: "/responsible-gambling" },
    { label: "Self-Exclusion", href: "/self-exclusion" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "AML Policy", href: "/aml" },
    { label: "KYC Policy", href: "/kyc" },
  ],
};

const paymentMethods = [
  "VISA", "MASTERCARD", "BTC", "ETH", "USDT", "SKRILL", "NETELLER", "BANK",
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark-2 border-t border-white/5 mt-auto">
      {/* Responsible gambling banner */}
      <div className="bg-brand-dark-3 border-b border-white/5 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Shield className="w-4 h-4 text-brand-gold shrink-0" />
            <span>
              Gambling can be addictive. Play responsibly. Must be 18+ to play.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 border border-white/20 rounded px-2 py-0.5">
              18+
            </span>
            <span className="text-xs text-white/30 border border-white/20 rounded px-2 py-0.5">
              GamCare
            </span>
            <span className="text-xs text-white/30 border border-white/20 rounded px-2 py-0.5">
              BeGambleAware
            </span>
            <Link
              href="/responsible-gambling"
              className="text-xs text-brand-gold hover:underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-xl">
                POWER<span className="text-brand-gold">.BET</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Licensed and regulated online casino and sports betting platform.
              Play safely and responsibly.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:support@powerbet.com"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-brand-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@powerbet.com
              </a>
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 800 123 4567
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-sm text-white/70 mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            Payment Methods
          </p>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs font-semibold text-white/50"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="text-xs text-white/25 leading-relaxed max-w-2xl">
            <p className="font-semibold text-white/40 mb-1">License & Regulation</p>
            <p>
              POWER.BET is licensed and regulated by the Malta Gaming Authority
              (License No. MGA/B2C/123/2024) and the UK Gambling Commission
              (License No. 000-123456). All games are tested and certified by
              eCOGRA for fair play. © {new Date().getFullYear()} POWER.BET Ltd.
              All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-white/25 border border-white/10 rounded px-2 py-1">
              MGA Licensed
            </span>
            <span className="text-xs text-white/25 border border-white/10 rounded px-2 py-1">
              SSL Secured
            </span>
            <span className="text-xs text-white/25 border border-white/10 rounded px-2 py-1">
              eCOGRA Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
