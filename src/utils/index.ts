const filteredListByAlphabetic = (data: any, filterBy: string) => {
   const mapListToObjects = listOfObjectToObject(data, filterBy);
   const filteredList: { [name: string]: { [subName: string]: {} } } = {};
   // tslint:disable-next-line: forin
   for (const property in mapListToObjects) {
      if (!filteredList.hasOwnProperty(property[0])) {
         filteredList[property[0]] = {};
      }
      filteredList[property[0]][property] = mapListToObjects[property];
   }
   return filteredList;
};

const listOfObjectToObject = (data: any, filterBy: string) =>
   Object.assign({}, ...data.map((item: any) => ({ [item[filterBy]]: item })));

export { filteredListByAlphabetic };
