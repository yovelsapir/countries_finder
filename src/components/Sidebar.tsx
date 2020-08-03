import React, { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import './Sidebar.scss';
import List from './List';

interface Country {
   name: string;
   flag: string;
}

type SidebarProps = {
   onSearchChange: (value: string) => void;
   search: string;
   title?: string;
   countries: {
      [name: string]: Country;
   };
};

const Sidebar: FunctionComponent<SidebarProps> = ({
   search = '',
   onSearchChange,
   title = 'Country List',
   countries = {},
}) => {
   const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
   };

   const searchBox = () => {
      return (
         <form
            className="form"
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
         >
            <div className="form__group">
               <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={onHandleSearch}
                  value={search}
               />
               {!search && <label htmlFor="search">Search</label>}
            </div>
         </form>
      );
   };

   return (
      <div className="sidebar">
         <div className="sidebar__header">{title}</div>
         {searchBox()}
         {/* <hr className="sidebar__hr" /> */}
         <ul className="sidebar__list">
            <List countries={countries} search={search} />
         </ul>
      </div>
   );
};

export default Sidebar;
