import Layout from '../../../components/Layout';
import { loadContent } from '../../../lib/frontmatter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

// 英文分类 → 中文映射
const categoryNameMap: Record<string, string> = {
  sea: "海运案例",
  air: "空运案例",
  express: "快递案例",
  "overseas-warehouse": "海外仓案例"
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['sea', 'air', 'express', 'overseas-warehouse'];
  return { 
    paths: categories.map(c => ({ params: { category: c } })), 
    fallback: false 
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cases = loadContent('content/cases', 'case')
    .filter((c: any) => c.category === params?.category);

  return { 
    props: { 
      cases, 
      category: params?.category 
    } 
  };
};

export default function CategoryCases({ cases, category }: any) {
  // 转换分类中文名
  const cnName = categoryNameMap[category] || "案例中心";

  return (
    <Layout title={`${cnName} | 深圳时必达国际物流`}>
      <h1>{cnName}</h1>

      <div className="case-list">
        {cases.map((c: any) => {
          const date = c.publishDate
            ? new Date(c.publishDate).toLocaleDateString('zh-CN')
            : '';

          return (
            <div key={c.slug} className="case-item">
              <div className="case-thumb">
                {c.featuredImage ? (
                  <img src={c.featuredImage} alt={c.title} />
                ) : (
                  <div className="thumb-placeholder">图片</div>
                )}
              </div>

              <div className="case-info">
                <h2 className="case-title">
                  <Link href={`/cases/${c.slug}`}>{c.title}</Link>
                </h2>

                <div className="case-meta">
                  <span>{cnName}</span>
                  <span>{date}</span>
                  <Link href={`/cases/${c.slug}`} className="case-link">
                    查看详情 →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
