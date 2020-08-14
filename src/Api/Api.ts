const fetchCountries = async () => {
   try {
      const response = await fetch('https://restcountries.eu/rest/v2/all');
      return await response.json();
   } catch (err) {
      return err;
   }
};

const searchCountry = async (name: string) => {
   try {
      const response = await fetch(
         `https://restcountries.eu/rest/v2/name/${name}`
      );
      return await response.json();
   } catch (err) {
      return err;
   }
};

export default {
   fetchCountries,
   searchCountry,
};
