import React from 'react';
import './CountryDetails.scss';

const CountryDetails = ({ country = {}, countries = [] }: any) => {
   // tslint:disable-next-line: no-shadowed-variable
   const TableComponent = (country: any) => {
      return (
         <table>
            <tbody>
               <tr>
                  <td>Capital</td>
                  <td>{country.capital}</td>
               </tr>
               <tr>
                  <td>Population</td>
                  <td>{country.population}</td>
               </tr>
               <tr>
                  <td>alpha2Code</td>
                  <td>{country.alpha2Code}</td>
               </tr>
               <tr>
                  <td>Flag</td>
                  <td>
                     <img src={country.flag} alt={country.name}></img>
                  </td>
               </tr>
            </tbody>
         </table>
      );
   };

   const TableListComponent = () => {
      return Object.entries(countries).map((item: any) => {
         const [countryName, countryData] = item;
         return (
            <div key={countryName} style={{ padding: '1rem', flex: '0 0 1' }}>
               {TableComponent(countryData)}
            </div>
         );
      });
   };

   const renderTableDetails = () => {
      // console.log(currentAlphabetic);
      if (!country.name) {
         return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
               {TableListComponent()}
            </div>
         );
      } else {
         return TableComponent(country);
      }
   };

   const renderDetails = () => (
      <div className="country-details">
         <div className="country-details__container">
            <div className="country-details__container--header">
               <h1>Country Details</h1>
            </div>

            <div className="country-details__container--body">
               {renderTableDetails()}
            </div>
         </div>
      </div>
   );

   return <React.Fragment>{renderDetails()}</React.Fragment>;
};

export default CountryDetails;
