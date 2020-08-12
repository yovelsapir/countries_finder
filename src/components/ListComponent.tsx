import React from 'react';
import { connect } from 'react-redux';
import {
   setCurrentCountryChange as setCurrentCountryChangeAction,
   setCurrentAlphabeticChange as setCurrentAlphabeticChangeAction,
} from '../actions';

type ListProps = {
   searchValue?: string;
   countries: { [title: string]: { [name: string]: Country } };
   setCurrentCountryChange: (value: string) => void;
   setCurrentAlphabeticChange: (value: string) => void;
};

interface Country {
   name: string;
   flag: string;
}

const ListComponent = ({
   countries,
   searchValue = '',
   setCurrentCountryChange,
   setCurrentAlphabeticChange,
}: ListProps) => {
   const onCountryClicked = (countryName: string) => {
      setCurrentCountryChange(countryName);
   };

   const onAlphabeticClicked = (alphabetic: string) => {
      setCurrentAlphabeticChange(alphabetic);
   };

   const renderCountriesList = (countryList: any) => {
      if (!countryList) return <div>No data found...</div>;

      return (
         <ul key={countryList}>
            {Object.values(countryList)
               .filter((country: any) =>
                  country.name.toUpperCase().includes(searchValue)
               )
               .map((item: any) => {
                  return (
                     <li
                        key={item.name}
                        onClick={() => onCountryClicked(item?.name)}
                     >
                        <span>{item?.name}</span>
                        <img src={item?.flag} alt={item?.name} />
                     </li>
                  );
               })}
         </ul>
      );
   };

   const renderCountriesAlphabeticList = () =>
      Object.entries(countries)
         .filter((country: any) =>
            searchValue ? country[0][0].toUpperCase() === searchValue[0] : true
         )
         .map((country: any) => {
            return (
               <li className="sidebar__list--item" key={country[0]}>
                  <span onClick={() => onAlphabeticClicked(country[0])}>
                     {country[0]}
                  </span>
                  {renderCountriesList(country[1])}
               </li>
            );
         });

   return <React.Fragment>{renderCountriesAlphabeticList()}</React.Fragment>;
};

const mapStateToProps = ({
   countries: {
      present: { searchValue },
   },
}: any) => ({
   searchValue: searchValue.toUpperCase(),
});

export default connect(mapStateToProps, {
   setCurrentCountryChange: setCurrentCountryChangeAction,
   setCurrentAlphabeticChange: setCurrentAlphabeticChangeAction,
})(ListComponent);
