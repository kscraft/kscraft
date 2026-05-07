"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 py-16 text-slate-300">
      <div className="container mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/" className="mb-6 inline-block rounded bg-white p-3 transition-transform hover:scale-105">
            <Image
              src="/assets/source/img/logo.png"
              alt="Kiran Slido Craft"
              width={180}
              height={56}
              className="h-auto w-auto"
            />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Kiran Slido Craft manufactures sound proof windows, sound proof
            partitions, motorized sliding systems, roof sliding systems, barrier
            systems and vertical sliding windows since 1985.
          </p>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="tel:+919324084590"
                className="transition-colors hover:text-blue-400"
              >
                +91 93240 84590
              </a>
            </li>
            <li>
              <a
                href="tel:+919769371856"
                className="transition-colors hover:text-blue-400"
              >
                +91 97693 71856
              </a>
            </li>
            <li>
              <a
                href="mailto:info@kiranslidocraft.com"
                className="transition-colors hover:text-blue-400"
              >
                info@kiranslidocraft.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Follow
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="https://www.youtube.com/kiranslidocraft"
                className="transition-colors hover:text-blue-400"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/kiranslidocraft/"
                className="transition-colors hover:text-blue-400"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/kiranslidocraft/"
                className="transition-colors hover:text-blue-400"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-16 border-t border-slate-800 pt-8 px-4 text-center text-xs text-slate-500 md:px-8">
        © {new Date().getFullYear()} Kiran Slido Craft. All rights reserved. Made in India.
      </div>
    </footer>
  );
};
