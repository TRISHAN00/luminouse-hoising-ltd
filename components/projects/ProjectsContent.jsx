// app/projects/ProjectsContent.js
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectList from './ProjectList';

export function ProjectsContent({ initialData, locationOptions, initialStatus, initialType, initialLocation }) {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [projects, setProjects] = useState(initialData);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const status = searchParams.get('status') || '';
        const type = searchParams.get('type') || '';
        const location = searchParams.get('location') || '';
        
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

        const res = await fetch(apiUrl);
        const fetchedData = await res.json();
        setProjects(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (selectedStatus) params.set('status', selectedStatus);
    if (selectedType) params.set('type', selectedType);
    if (selectedLocation) params.set('location', selectedLocation);
    
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateUrl();
  }, [selectedStatus, selectedType, selectedLocation]);

  return (
    <ProjectList
        data={projects?.data}
        location={locationOptions}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        loading={loading}
      />
  );
}