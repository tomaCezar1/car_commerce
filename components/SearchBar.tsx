'use client';
import { useState, FormEvent } from 'react';
import Image from 'next/image';

import SearchManufacturer from './SearchManufacturer';

const SearchButton = ({ buttonClasses }: { buttonClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${buttonClasses}`}>
    <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} className="object-contain" />
  </button>
);

const SearchBar = ({ setManufacturer, setModel }) => {
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchManufacturer && !searchModel) return;
    setModel(searchModel);
    setManufacturer(searchManufacturer);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item ">
        <SearchManufacturer manufacturer={searchManufacturer} setManufacturer={setSearchManufacturer} />
        <SearchButton buttonClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image src="/model-icon.png" alt="model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={({ target }) => setSearchModel(target.value)}
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
