import { getGameBySlug, getRelatedGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameInfo from '@/components/game/game-info';
import RelatedGames from '@/components/game/related-games';
import { siteConfig } from "@/config/site";

type Props = Promise<{
  slug: string;
  prepage?: string;
}>

interface breadcrumbItem {
  label: string;
  href: string;
}

// 定义 generateMetadata 函数
export async function generateMetadata(props: { params: Props } ) {
  const params = await props.params;
  const game = await getGameBySlug(params.slug);
  return {
    title: `ScratchGames.info - ${game?.title}`,
    description: 'Play the best free online scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/game/${game?.id}`,
    },
  };
}

export default async function GamePage(props: { params: Props, searchParams: Props }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  console.log('params------', params)
  console.log('searchParams------', searchParams)
  const game = await getGameBySlug(params.slug);
  const relatedGames = await getRelatedGames(params.slug);
  let breadLabel = ''
  let breadcrumbItems = [] as breadcrumbItem[];
  
  if (!game) {
    return <div>Game not found</div>;
  }

  if (searchParams.prepage) {
    let prepage = searchParams.prepage.split('/')[1]
    if (prepage) {
      let list = prepage.split('-')
      list = list.map((item) => item[0].toUpperCase() + item.slice(1))
      breadLabel = list.join(' ')
      breadcrumbItems = [
        { label: `${breadLabel}`, href: `/${searchParams.prepage}` },
        { label: `${game.title}`, href: `/${searchParams.prepage}/${params.slug}` }
      ]
    } else {
      if (searchParams.prepage === 'home') {
        breadcrumbItems = [
          { label: `${game.title}`, href: `/${params.slug}` }
        ]
      } else {
        breadLabel = searchParams.prepage[0].toUpperCase() + searchParams.prepage.slice(1)
        breadcrumbItems = [
          { label: `${breadLabel}`, href: `/${searchParams.prepage}` },
          { label: `${game.title}`, href: `/${searchParams.prepage}/${params.slug}` }
        ]
      }
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {searchParams.prepage && <Breadcrumb 
        items={breadcrumbItems} 
      />}
      {/* 游戏标题 */}
      <h1 className="text-3xl font-bold mb-6">{game.title}</h1>
      
      {/* 游戏界面 */}
      <div className="aspect-video w-full mb-8 bg-black rounded-lg overflow-hidden">
        <iframe
          src={game.url}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* 游戏信息 */}
      <GameInfo game={game} />

      {/* 相关游戏 */}
      <RelatedGames games={relatedGames} />
    </div>
  );
}