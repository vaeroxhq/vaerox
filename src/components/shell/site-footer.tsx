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
        { label: "Email", href: "mailto:hello@vaerox.dev" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/vaerox" },
        { label: "GitHub", href: "https://github.com/vaerox" },
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
                        className="text-[12px] text-text-2 hover:text-text-1 transition-micro"
                      >
                        {link.label}
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
          <FootCell label="Studio" value="VÆRØX · Independent" />
          <FootCell label="Status" value="Active & Available" />
          <FootCell label="Response" value="Within 24 hours" />
          <FootCell label="Timezone" value="IST (UTC+5:30)" />
        </div>

        {/* Copyright */}
        <div className="hairline-t py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            © VÆRØX · Independent AI engineering studio
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
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular truncate">{value}</span>
    </div>
  );
}
