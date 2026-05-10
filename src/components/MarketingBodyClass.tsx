"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Legacy portfolio / Reflective CSS keys off `body.marketing-portfolio` and
 * `body.is-reflective` (writing routes). Applied only while marketing layout is mounted.
 */
export function MarketingBodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("marketing-portfolio");
    if (pathname.startsWith("/writing")) {
      document.body.classList.add("is-reflective");
    } else {
      document.body.classList.remove("is-reflective");
    }
    return () => {
      document.body.classList.remove("marketing-portfolio", "is-reflective");
    };
  }, [pathname]);

  return null;
}
