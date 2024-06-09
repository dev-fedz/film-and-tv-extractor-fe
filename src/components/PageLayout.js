import React, { useState, useEffect } from 'react';

import Navbar from '@/components/navbar';
import { useWindowSize } from '@/utils/utils';

export default function PageLayout(props) {

  const [isOpen, setIsOpen] = useState(false);
  const windowSize = useWindowSize();

  const home = { label: 'Shipment List', icon: 'pi pi-home', url: '/' };

  useEffect(() => {
    if (windowSize?.width > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [windowSize]);

  return (
    <div className="flex w-screen h-auto">

      <div className="w-auto md:w-full flex flex-col">
        <Navbar title={props?.title} setIsOpen={setIsOpen} isOpen={isOpen} />

        <div className="container mx-auto">{props?.children}</div>

      </div>
    </div>
  );
}
