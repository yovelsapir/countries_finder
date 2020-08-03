/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, FunctionComponent } from 'react';
import BaseLayout from '../components/BaseLayout';
import { connect } from 'react-redux';
// import { fetchCountries as fetchCountriesAction } from './../actions/index';
import Sidebar from '../components/Sidebar';
import CountryDetails from '../components/CountryDetails';
import { fetchCountriesAction } from '../actions';

interface Country {
   name: string;
   capital: string;
   population: number;
   alpha2Code: string;
   flag: string;
}

type HomeProps = {
   currentCountry: string;
   countries: { [name: string]: Country };
   fetchCountries: () => void;
};

const Home: FunctionComponent<HomeProps> = ({
   countries,
   currentCountry = '',
   fetchCountries,
}: HomeProps) => {
   useEffect(() => {
      fetchCountries();
   }, []);

   return (
      <BaseLayout>
         <Sidebar title="Country List" countries={countries} />
         {currentCountry && (
            <CountryDetails country={countries[currentCountry]} />
         )}
      </BaseLayout>
   );
};

const mapStateToProps = ({
   countries: {
      present: { data, country },
   },
}: any) => {
   return {
      countries: data,
      currentCountry: country,
   };
};

export default connect(mapStateToProps, {
   fetchCountries: fetchCountriesAction,
})(Home);
