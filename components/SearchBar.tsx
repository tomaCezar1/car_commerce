'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import SearchManufacturer from './SearchManufacturer';

const SearchButton = ({ buttonClasses }: { buttonClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${buttonClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const router = useRouter();

  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!manufacturer && !model) return;

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item ">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton buttonClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={({ target }) => setModel(target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton buttonClasses="sm:hidden" />
      </div>

      <SearchButton buttonClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
