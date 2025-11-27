import { useRouter } from "next/router";
import Link from "next/link";

export default function Breadcrumbs() {
  const router = useRouter();
  const parts = router.asPath.split('?')[0].split('/').filter(Boolean);

  const crumbs = [
    { label: '首页', href: '/' },
    ...parts.map((p, idx) => {
      // 默认 href
      let href = '/' + parts.slice(0, idx + 1).join('/');

      // 特殊规则
      if (parts[0] === 'industry-information' && idx === 1) {
        href = `/industry-information/category/${parts[1]}`;
      }

      return { label: p, href };
    })
  ];

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={c.href}>
          {i < crumbs.length - 1 ? (
            <Link href={c.href}>{c.label}</Link>
          ) : (
            <span>{c.label}</span>
          )}
          {i < crumbs.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}
