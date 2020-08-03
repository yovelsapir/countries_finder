import React, { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import './Sidebar.scss';
import List from './List';
import { connect } from 'react-redux';
import { searchCountryChangeAction } from '../actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

interface Country {
   name: string;
   flag: string;
}

type SidebarProps = {
   onSearchCountryChange: (value: string) => void;
   onUndo: () => void;
   canUndo: boolean;
   searchValue: string;
   title?: string;
   countries: {
      [name: string]: Country;
   };
};

const Sidebar: FunctionComponent<SidebarProps> = ({
   onSearchCountryChange,
   onUndo,
   canUndo,
   searchValue = '',
   title = 'Country List',
   countries = {},
}) => {
   const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(onSearchCountryChange(e.target.value));
      onSearchCountryChange(e.target.value);
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
                  // value={searchValue}
               />
               {!searchValue && <label htmlFor="search">Search</label>}
            </div>
         </form>
      );
   };

   return (
      <div className="sidebar">
         <div className="sidebar__header">
            <span>{title}</span>
            <i onClick={() => canUndo && onUndo()}>&#8634;</i>
         </div>
         {searchBox()}
         {/* <hr className="sidebar__hr" /> */}
         <ul className="sidebar__list">
            <List countries={countries} search={searchValue} />
         </ul>
      </div>
   );
};

const mapStateToProps = ({
   countries: {
      present: { searchValue },
      past,
   },
}: any) => {
   return {
      searchValue,
      canUndo: past.length > 5,
   };
};

const mapDispatchToProps = {
   onUndo: UndoActionCreators.undo,
   onSearchCountryChange: searchCountryChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
