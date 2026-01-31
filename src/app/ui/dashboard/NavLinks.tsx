import ActiveLinkWrapper from './ActiveLinkWrapper';
import React from 'react';
import { fetchPages } from '@/lib/data';
import { Pages } from '@/lib/definitions';

export default async function NavLinks() {
  const pages = (await fetchPages()) as unknown as Pages[];

  return (
    <React.Fragment>
      {pages.map((link) => (
        <ActiveLinkWrapper key={link.name} link={link} />
      ))}
    </React.Fragment>
  );
}
