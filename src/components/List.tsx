import React from 'react';
import { connect } from 'react-redux';
import { searchCountry as searchCountryAction } from '../actions';

interface AlphabeticList {
   [title: string]: string[];
}

type ListProps = {
   search: string;
   countries: {
      [name: string]: Country;
   };
   searchCountry: (value: string) => void;
};

interface Country {
   name: string;
   flag: string;
}

const List = ({ countries, search, searchCountry }: ListProps) => {
   const onCountryClicked = (countryName: string) => {
      searchCountry(countryName);
   };

   const getAlphabeticList = () => {
      const countryNames = Object.keys(countries);
      const alphabeticList: AlphabeticList = {};

      countryNames.forEach((country: string, index) => {
         if (countryNames[index][0] === country[0]) {
            if (!alphabeticList[country[0]]) {
               alphabeticList[country[0]] = [];
            }
            alphabeticList[country[0]].push(country);
         }
      });

      let filteredList = [];
      if (!search) {
         filteredList = Object.keys(alphabeticList);
      } else {
         filteredList = Object.keys(alphabeticList).filter((item) =>
            item.toLowerCase().includes(search.toLowerCase()[0])
         );
      }

      if (filteredList.length === 0) {
         return <h2>Not data found...</h2>;
      }

      const renderFilteredCountryList = (alphabetic: string) => {
         const filteredListCountries = alphabeticList[
            alphabetic
         ].filter((countryName) =>
            countryName.toLowerCase().includes(search.toLowerCase())
         );

         if (filteredListCountries.length === 0)
            return <h2>No data found...</h2>;

         return filteredListCountries.map((countryName) => (
            <li key={countryName} onClick={() => onCountryClicked(countryName)}>
               <span>{countries[countryName]?.name}</span>
               <img
                  src={countries[countryName]?.flag}
                  alt={countries[countryName]?.name}
               />
            </li>
         ));
      };

      return filteredList.map((alphabetic: string) => (
         <li className="sidebar__list--item" key={alphabetic}>
            <span>{alphabetic}</span>
            <ul key={alphabetic}>{renderFilteredCountryList(alphabetic)}</ul>
         </li>
      ));
   };

   return <React.Fragment>{getAlphabeticList()}</React.Fragment>;
};

export default connect(null, {
   searchCountry: searchCountryAction,
})(List);
