import { fetchPages } from '@/lib/data';
import ActiveLinkWrapper from './ActiveLinkWrapper';
import React from 'react';

export default async function NavLinks() {
  const pages = await fetchPages();

  return (
    <React.Fragment>
      {pages.map((link) => (
        <ActiveLinkWrapper key={link.name} link={link} />
      ))}
    </React.Fragment>
  );
}
