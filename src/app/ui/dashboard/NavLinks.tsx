import ActiveLinkWrapper from './ActiveLinkWrapper';
import React from 'react';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function NavLinks() {
  const response = await fetch(`${getBaseUrl()}/api/pages`, {
    cache: 'no-store',
  });
  const pages = await response.json();

  return (
    <React.Fragment>
      {pages.map((link: { name: string; path: string; icon: string }) => (
        <ActiveLinkWrapper key={link.name} link={link} />
      ))}
    </React.Fragment>
  );
}
