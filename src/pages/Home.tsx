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
   countries: { [title: string]: { [name: string]: Country } };
   fetchCountries: () => void;
   done: boolean;
   currentAlphabetic: string;
};

const Home: FunctionComponent<HomeProps> = ({
   countries,
   currentCountry = '',
   currentAlphabetic = '',
   fetchCountries,
   done = true,
}: HomeProps) => {
   useEffect(() => {
      fetchCountries();
   }, []);

   const renderPage = () => {
      if (!done) return <div>Loading....</div>;

      const renderCountryDetails = () => {
         if (!countries) return <div>Loading....</div>;

         if (currentCountry && currentAlphabetic) {
            return (
               <CountryDetails
                  country={countries[currentAlphabetic][currentCountry]}
               />
            );
         } else if (!currentCountry) {
            return <CountryDetails countries={countries[currentAlphabetic]} />;
         }
         return null;
      };

      return (
         <React.Fragment>
            <Sidebar title="Country List" countries={countries} />
            {renderCountryDetails()}
         </React.Fragment>
      );
   };
   return <BaseLayout>{renderPage()}</BaseLayout>;
};

const mapStateToProps = ({
   countries: {
      present: { data, country, done, alphabetic },
   },
}: any) => {
   return {
      countries: data,
      currentCountry: country,
      currentAlphabetic: alphabetic,
      done,
   };
};

export default connect(mapStateToProps, {
   fetchCountries: fetchCountriesAction,
})(Home);
