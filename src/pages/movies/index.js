import React from 'react';
import PageLayout from '@/components/PageLayout';
import Movies from './Movies';

export default function Home() {
  return (
    <PageLayout
      title="Film & TV Extractor"
    >
      <Movies/>
    </PageLayout>
  );
}
