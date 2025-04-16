// app/projects/page.js
import InnerBanner from '@/components/InnerBanner';
import { ProjectsContent } from '@/components/projects/ProjectsContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Projects | Tropical Homes',
  description: 'Find your dream home, office, or condo anywhere in Dhaka with Tropical Homes. Offering a selection of residential, commercial, and condo properties throughout the city.'
};

async function getProjectsData(searchParams) {
  const { status = '', type = '', location = '' } = searchParams;

  let apiUrl = 'https://cms.tropicalhomesltd.com/api/get-req-data/product-by-cats?image=yes';

  if (status) {
    apiUrl += `&category=${status}`;
  }
  if (type) {
    apiUrl += `&type=${type}`;
  }
  if (location) {
    apiUrl += `&location=${location}`;
  }

  const res = await fetch(apiUrl, { next: { revalidate: 3600 } }); // Cache for 1 hour
  
  if (!res.ok) {
    throw new Error('Failed to fetch projects data');
  }
  
  return res.json();
}

export default async function Projects({ searchParams }) {
  const data = await getProjectsData(searchParams);
  const innerBanner = data?.section_data;
  
  const { status = '' } = searchParams;
  
  const upcoming = innerBanner?.images?.list?.find((f) => f?.upcoming === "on");
  const desktop = innerBanner?.images?.list?.find((f) => f?.Desktop === "on");
  const ongoing = innerBanner?.images?.list?.find((f) => f?.ongoing === "on");
  const ready = innerBanner?.images?.list?.find((f) => f?.ready === "on");
  const completed = innerBanner?.images?.list?.find((f) => f?.completed === "on");

  let image = desktop;

  switch (status) {
    case 'ongoing':
      image = ongoing;
      break;
    case 'upcoming':
      image = upcoming;
      break;
    case 'ready':
      image = ready;
      break;
    case 'completed':
      image = completed;
      break;
    default:
      break;
  }

  const locationOptions = data?.filter?.location_list?.map(item => ({
    value: item?.location,
    label: item?.location,
  }));

  return (
    <>
      <InnerBanner
        title={image?.short_title ? image?.short_title : innerBanner?.page_data?.subtitle}
        img={image?.full_path ? image?.full_path : desktop?.full_path}
        srcSm={image?.full_path}
      />
      <Suspense>
        <ProjectsContent 
          initialData={data}
          locationOptions={locationOptions}
          initialStatus={searchParams.status || ''}
          initialType={searchParams.type || ''}
          initialLocation={searchParams.location || ''}
        />
      </Suspense>
    </>
  );
}