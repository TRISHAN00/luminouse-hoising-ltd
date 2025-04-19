
import InnerBanner from '@/components/InnerBanner';
import NewsEventFilter from '@/components/news/NewsEventFilter';
import aboutImg from '../../public/images/dynamic/about/about.jpg';
export default function NewsEvents() {
  return (
    <div>
        <InnerBanner img={aboutImg} title={'News & Events'} />
        <NewsEventFilter/>
    </div>
  )
}
