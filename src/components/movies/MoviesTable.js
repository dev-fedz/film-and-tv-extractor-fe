import { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';

import { getMoviesList } from '@/api/movies';
import DataTableTemplate from '@/components/DataTableTemplate';
import Link from 'next/link';

export default function MoviesTable({ search, source }) {
  const toast = useRef(null);
  const [isRefresh, setIsRefresh] = useState(null);


  const template = (data) => {
    return (  
      <div  className="card flex flex-row">
        <img  className="h-30== w-20" src={data.poster} alt="Image" />
        <div  className="flex flex-col ml-5" >
          <label className="flex flex-row gap-2 text-2xl text-dark-secondary">
          <p className='font-bold'>Title:</p>
          <p>{data.label}</p>
          </label> 
          <label className="flex flex-row gap-2 text-2xl text-dark-secondary mt-5">
            <p className='font-bold'>Page:</p>
            <Link className='text-blue-600' href={data.url}>
              {data.url}
            </Link>
          </label> 
        </div>
      </div>  
    );
  };

  useEffect(() => {
    setIsRefresh(!isRefresh)
  }, [search, source])

  return (
    <div>
      <DataTableTemplate
        apiToUse={getMoviesList}
        refreshData={isRefresh}
        dataParams={{
          search,
          source: source,
        }}
      >
        <Column body={template} />
      </DataTableTemplate>

      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
}
