interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: "ホーム", href: "/" }, ...items];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://free-engineer-hub.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="パンくずリスト" className="bg-background border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <ol className="flex items-center flex-wrap gap-1 text-xs text-text-muted">
            {allItems.map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && <span className="text-border">›</span>}
                {item.href && index < allItems.length - 1 ? (
                  <a
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-text-secondary font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
