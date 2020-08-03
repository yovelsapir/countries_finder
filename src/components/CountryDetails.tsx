import React from 'react';
import './CountryDetails.scss';

// type CountryDetailsProps = {
//    name: string;
//    capital: string;
//    population: number;
//    alpha2Code: string;
//    flag: string;
// }

export default ({
   country: {
      name = '',
      capital = '',
      flag = '',
      population = 0,
      alpha2Code = '',
   } = {},
}: any) => {
   const renderTable = () => {
      if (!name) return <h3>No country selected</h3>;
      return (
         <table>
            <tbody>
               <tr>
                  <td>Capital</td>
                  <td>{capital}</td>
               </tr>
               <tr>
                  <td>Population</td>
                  <td>{population}</td>
               </tr>
               <tr>
                  <td>alpha2Code</td>
                  <td>{alpha2Code}</td>
               </tr>
               <tr>
                  <td>Flag</td>
                  <td>
                     <img src={flag} alt={name}></img>
                  </td>
               </tr>
            </tbody>
         </table>
      );
   };

   const renderDetails = () => (
      <div className="country-details">
         <div className="country-details__container">
            <div className="country-details__container--header">
               <h1>Country Details</h1>
            </div>

            <div className="country-details__container--body">
               {renderTable()}
            </div>
         </div>
      </div>
   );

   return <React.Fragment>{renderDetails()}</React.Fragment>;
};
