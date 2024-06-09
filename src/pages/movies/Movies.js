import { useState, useRef, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import MoviesTable from '@/components/movies/MoviesTable';
import { getSourceList } from '@/api/movies';
import { Dropdown } from 'primereact/dropdown';

export default function Movies() {
  const router = useRouter();
  const toast = useRef(null);
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 300);

  const [sourceList, setSourceList] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [sourceDebounced] = useDebounce(selectedSource, 300);

  useEffect(() => {
    if (router.query?.result) {
      toast.current?.show({
        severity: router.query.result,
        summary: router.query.summary,
        detail: router.query.detail,
      });
      router.push(
        {
          pathname: '/movies',
          query: {},
        },
        '/movies'
      );
    }
  }, [router]);

  
  const getData = useCallback(async () => {
    try {
      const res = await getSourceList({ is_active: true });
      if (res) {
        const resData = res.data.results.map((m) => {
          return { value: m.id, name: m.name };
        });
        setSourceList([{ name: 'All Sites', value: '' }, ...resData]);
      }
    } catch (err) {
      console.log(err?.response || err);
    }
  }, []);


  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="card-slim flex flex-col gap-5 m-10">
      <Toast ref={toast}></Toast>
      <div className="flex flex-row">
        <div className="flex-1 w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input-primary w-1/4 h-12"
            placeholder="Search TV or Film"
          ></input>
          
          <Dropdown
            className="h-12 w-1/4 ml-2 custom-dropdown"
            label="Source"
            name="source"
            options={sourceList}
            value={selectedSource}
            optionLabel="name"
            optionValue="value"
            placeholder="Select Sites"
            onChange={(e) => {
              setSelectedSource(e.value);
            }}
            showClear
          />
        </div>
        
      </div>

      <MoviesTable 
        search={searchDebounced} 
        source={sourceDebounced}
      />
    </div>
  );
}
