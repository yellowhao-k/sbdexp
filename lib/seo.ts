// ================================
// 🔧 工具函数：自动补全日期格式
// ================================
function normalizeDate(date?: string) {
  if (!date) return undefined;
  // 若已有 T，则视为完整 ISO 8601
  if (date.includes("T")) return date;
  // 自动补全为标准格式（东八区）
  return `${date}T00:00:00+08:00`;
}

// ================================
// 🔧 基础 SEO Meta 函数
// ================================
export function buildMetaTitle(title: string, siteName = "深圳时必达跨境物流") {
  return `${title} | ${siteName}`;
}

export function buildMetaDescription(excerpt: string, max = 155) {
  if (!excerpt) return "";
  return excerpt.length > max ? excerpt.slice(0, max - 3) + "..." : excerpt;
}

// ================================
// 🔧 Breadcrumb JSON-LD（面包屑）
// ================================
export function breadcrumbJsonLd(segments: string[], baseUrl: string) {
  const itemListElement = segments.map((seg, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: seg,
    item: `${baseUrl}/${segments.slice(0, i + 1).join('/')}`.replace(/\/+$/, '')
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

// ================================
// 🔧 服务 Schema
// ================================
export function serviceJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  baseUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.description,
    url: `${data.baseUrl}/services/${data.slug}`
  };
}

// ================================
// 🔥 NewsArticle（文章页 Schema）
// ✔ Google Rich Results 完整支持版
// ✔ 自动补全日期
// ✔ 图片数组
// ✔ mainEntityOfPage → WebPage
// ================================
export function articleJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
  publishDate?: string;
  modifiedDate?: string;
  baseUrl: string;
  siteName: string;
}) {
  const url = `${data.baseUrl}/industry-information/${data.category}/${data.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',

    // 标题双保险
    headline: data.title,
    name: data.title,

    // 描述
    description: data.description,

    // 自动 ISO8601
    datePublished: normalizeDate(data.publishDate),
    dateModified: normalizeDate(data.modifiedDate || data.publishDate),

    // 图片必须为数组
    image: data.image ? [`${data.baseUrl}${data.image}`] : undefined,

    // Google 推荐 mainEntityOfPage 是对象不是字符串
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },

    // 作者组织
    author: {
      '@type': 'Organization',
      name: data.siteName,
      url: data.baseUrl
    },

    // 发布者组织 + logo
    publisher: {
      '@type': 'Organization',
      name: data.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${data.baseUrl}/images/company.png`,
        width: 120,
        height: 120
      }
    },

    url
  };
}

// ================================
// 🔧 案例 Schema（Case Study）
// ================================
export function caseJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  baseUrl: string;
  image?: string;
  publishDate?: string;
  siteName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    description: data.description,
    url: `${data.baseUrl}/cases/${data.slug}`,
    datePublished: normalizeDate(data.publishDate),
    image: data.image ? [`${data.baseUrl}${data.image}`] : undefined,
    publisher: { '@type': 'Organization', name: data.siteName }
  };
}

// ================================
// 🔧 Organization（组织信息）
// ================================
export function organizationJsonLd(data: {
  name: string;
  url: string;
  logo: string;
  phone?: string;
  address?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    contactPoint: data.phone
      ? [
          {
            '@type': 'ContactPoint',
            telephone: data.phone,
            contactType: 'customer service'
          }
        ]
      : undefined,
    address: data.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.address
        }
      : undefined
  };
}
