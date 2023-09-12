'use client';
import { CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { CarCard } from '@/components';
import { fuels, yearsOfProduction } from '@/constants/constants';
import { fetchCars } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const getCars = useCallback(async () => {
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [fuel, year, limit, manufacturer, model]);

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model, getCars]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars?.length ? (
          <section>
            <div className="home__cars-wrapper">{allCars?.map((car, index) => <CarCard key={index} car={car} />)}</div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" width={50} height={50} alt="loading" className="object-contain" />
              </div>
            )}
            <ShowMore pageNumber={limit / 10} isNext={limit > allCars.length} setLimit={setLimit} />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
            <p>{(allCars as any)?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
