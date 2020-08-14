import { eventChannel, END } from 'redux-saga';
import Api from '../Api/Api';

function countriesEvent() {
   let countries = [];
   return eventChannel((emitter) => {
      const iv = setInterval(async () => {
         try {
            if (countries.length === 0) {
               countries = await Api.fetchCountries();
               emitter(countries);
            }

            console.log('PING!');
         } catch (error) {
            emitter(END);
         }
      }, 2000);
      return () => {
         clearInterval(iv);
      };
   });
}

export { countriesEvent };
