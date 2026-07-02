import { Link } from "@tanstack/react-router";
import { VaeroxMark } from "@/components/brand/vaerox-mark";

/**
 * Site footer — comprehensive navigation, contact, and meta information.
 * Organized by section: Services, Projects, Research, Engineering, Contact, Social.
 */
export function SiteFooter() {
  const sections = [
    {
      title: "Studio",
      links: [
        { label: "Services", to: "/services" },
        { label: "Projects", to: "/projects" },
        { label: "Research", to: "/research" },
        { label: "Journal", to: "/journal" },
      ],
    },
    {
      title: "Engineering",
      links: [
        { label: "Architecture", to: "/architecture" },
        { label: "Technologies", to: "/technologies" },
        { label: "Engineering", to: "/engineering" },
        { label: "Graph", to: "/graph" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", to: "/contact" },
        { label: "Email", href: "mailto:vaeroxhq@gmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/vaerox" },
        { label: "GitHub", href: "https://github.com/vaeroxhq" },
        { label: "WhatsApp", href: "https://wa.me/918130650944" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", href: "https://instagram.com/vaeroxlabs" },
        { label: "Bluesky", href: "https://bsky.app/profile/vaerox.dev" },
        { label: "About", to: "/about" },
        { label: "Search", to: "/search" },
      ],
    },
  ];

  return (
    <footer aria-label="Site metadata" className="mt-24">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        {/* Navigation grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1 hairline">
          {sections.map((section) => (
            <div key={section.title} className="bg-canvas px-4 py-6">
              <h3 className="font-mono font-medium text-[10px] text-text-3 uppercase tracking-[0.14em] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-[12px] text-text-2 hover:text-text-1 transition-micro"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-text-2 hover:text-text-1 transition-micro inline-flex items-center gap-2"
                      >
                        {link.label === 'WhatsApp' ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-4 h-4">
                              <path d="M20.52 3.48A11.78 11.78 0 0012 0C5.37 0 .03 5.34.03 12a11.63 11.63 0 001.65 5.86L0 24l6.39-1.68A11.8 11.8 0 0012 24c6.63 0 11.97-5.34 11.97-12 0-3.2-1.22-6.25-3.45-8.52z" fill="currentColor" />
                              <path d="M17.55 14.2c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2 0-.37-.02-.52-.02-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.12 3.36 5.14 4.71 3.03 1.35 3.03.9 3.57.84.54-.07 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.13-.27-.2-.57-.35z" fill="#fff" />
                            </svg>
                            <span>WhatsApp</span>
                          </>
                        ) : (
                          link.label
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Meta strip */}
        <div className="hairline-t grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <FootCell label="Studio" value="Vareox · Independent" />
          <FootCell label="Status" value="Active & Available" />
          <FootCell label="Response" value="Within 24 hours" />
          <FootCell label="Timezone" value="IST (UTC+5:30)" />
        </div>

        {/* Copyright */}
        <div className="hairline-t py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            © Vareox · Independent AI engineering studio
          </span>
          <VaeroxMark size={14} className="opacity-60" />
        </div>
      </div>
    </footer>
  );
}

function FootCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{label}</span>
      <span className="font-mono text-[11px] text-text-2 tabular truncate">{value}</span>
    </div>
  );
}
