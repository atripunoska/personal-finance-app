'use client';
import { useDebouncedCallback } from 'use-debounce';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams || '');
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex xl:flex-1 flex-shrink-0 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer inline-block w-full lg:w-xs xl:w-sm rounded-md border py-[9px] pl-2 text-sm  placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        id="search"
        defaultValue={searchParams?.get('query')?.toString()}
        type="search"
      />
    </div>
  );
}
