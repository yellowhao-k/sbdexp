import styles from './PartnerWall.module.css';

interface Partner { name: string; logo: string; alt: string; href: string; }

// Eight partners; we duplicate when rendering for seamless infinite scroll.
const partners: Partner[] = [
  { name: 'DHL Express – 国际快递', logo: '/images/partners/partner-1.jpg', alt: 'DHL 标志', href: 'https://www.dhl.com/cn-zh/home.html' },
  { name: 'FedEx 快递', logo: '/images/partners/partner-2.jpg', alt: 'FedEx 快递', href: 'https://www.fedex.com' },
  { name: 'UPS 快递', logo: '/images/partners/partner-3.jpg', alt: 'UPS 快递', href: 'https://www.ups.com' },
  { name: '中国东方航空', logo: '/images/partners/partner-4.jpg', alt: '中国东方航空', href: 'https://www.ceair.com' },
  { name: 'TNT', logo: '/images/partners/partner-5.jpg', alt: 'TNT 标志', href: 'https://www.tnt.com' },
  { name: 'Air China', logo: '/images/partners/partner-6.jpg', alt: 'Air China 标志', href: 'https://www.airchina.com.cn' },
  { name: '中国东方航空', logo: '/images/partners/partner-7.jpg', alt: '中国东方航空 标志', href: 'https://www.ceair.com' },
  { name: '中国南方航空', logo: '/images/partners/partner-8.jpg', alt: '中国南方航空 标志', href: 'https://www.csair.com' }
];

export default function PartnerWall() {
  return (
    <div className={styles.wall} aria-label="合作伙伴滚动展示">
      <div className={styles.track}>
        {[...partners, ...partners].map((p, i) => (
          <a
            key={p.name + '-' + i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partner}
            title={p.name}
            aria-label={p.alt}
          >
            <img src={p.logo} alt={p.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  );
}
