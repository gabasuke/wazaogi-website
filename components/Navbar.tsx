"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { navItems, restaurant } from "@/lib/site";

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ドロワー展開中は Tab フォーカスをドロワー内に閉じ込め、Escape で閉じる
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const drawer = drawerRef.current;
    if (!drawer) {
      return;
    }

    const getFocusables = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

    getFocusables()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") {
        return;
      }

      const focusables = getFocusables();
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-[#081221]/92 shadow-[0_4px_32px_rgba(0,0,0,.5)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* ロゴ */}
          <a href="#top" className="group flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-lantern/40 bg-lantern/15">
              <Image
                src="/images/wazaogi-mascot-icon-round.png"
                alt="わざおぎ"
                fill
                sizes="44px"
                className="object-cover"
                unoptimized
              />
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap font-display text-[13px] font-semibold leading-tight tracking-[0.14em] text-mist/60 sm:hidden">
                {t("brand.name1")}
              </span>
              <span className="block whitespace-nowrap font-display text-base font-semibold leading-[1.2] tracking-[0.18em] text-white sm:hidden">
                {t("brand.name2")}
              </span>
              <span className="hidden font-display text-lg font-semibold tracking-[0.18em] text-white sm:block">
                {t("brand.name")}
              </span>
              <span className="hidden whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-white/50 sm:block">
                Teppan Izakaya · Ishigaki
              </span>
            </span>
          </a>

          {/* デスクトップナビ */}
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.2em] text-white/65 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative py-1 transition-colors hover:text-lantern after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-lantern after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
          </nav>

          {/* 右端: 言語 + ハンバーガー */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur-md transition hover:border-lantern/50 hover:bg-lantern/15 lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* モバイルドロワー */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              className="fixed inset-0 z-40 bg-night/75 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
            />

            {/* ドロワー */}
            <motion.nav
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "en" ? "Navigation menu" : "ナビゲーションメニュー"}
              className="fixed inset-y-0 right-0 z-40 flex w-72 flex-col bg-[#081221] px-8 pt-24 pb-10 shadow-[−8px_0_60px_rgba(0,0,0,.6)] lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div className="mb-6 h-px bg-gradient-to-r from-lantern/40 via-white/10 to-transparent" />
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${item}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 font-display text-xl text-white/85 transition hover:bg-lantern/10 hover:text-lantern active:bg-lantern/20"
                      onClick={closeMenu}
                    >
                      <span className="size-1.5 rounded-full bg-lantern/60" />
                      {t(`nav.${item}`)}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* 下部: 電話 */}
              <div className="mt-auto pt-8 border-t border-white/8">
                <p className="text-xs text-mist/45 tracking-widest mb-2">CALL US</p>
                <a
                  href={`tel:${restaurant.phone}`}
                  className="font-display text-xl text-lantern hover:text-white transition"
                >
                  {restaurant.phone}
                </a>
                <p className="mt-1 text-xs text-mist/50">17:00 〜 翌1:00</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
