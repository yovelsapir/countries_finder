const fetchCountries = async () => {
   try {
      const response = await fetch('https://restcountries.eu/rest/v2/all');
      return await response.json();
   } catch (err) {
      return err;
   }
};

export default {
   fetchCountries,
};
