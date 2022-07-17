import React, { useState } from 'react';
import "./List.css";
import { useLocation } from "react-router-dom";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/SearchItem/SearchItem';

const List = () => {

  const location = useLocation()

  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)


  const handleOptionID = (name, operation) => {
    setOptions(prev => {return{
      ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }})
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} onChange={(e) => setDestination(e)}/>
            </div>

            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>

              {openDate && <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />}
            </div>

            <div className="lsItem">
                <label htmlFor="">Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Min price <i>per night</i></span>
                    <input type="text" className="lsOptionInput" />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">Max price <i>per night</i></span>
                    <input type="text" className="lsOptionInput" />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <div className="idOptions">
                      <button className="increseBtn" onClick={() => handleOptionID("adult", "i")}>+</button>
                      <input type="text" className="lsOptionInput" placeholder={options.adult}/>
                      <button disabled={options.adult <= 1} className="decreaseBtn" onClick={() => handleOptionID("adult", "d")}>-</button>
                    </div>
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <div className="idOptions">
                      <button className="increseBtn" onClick={() => handleOptionID("children", "i")}>+</button>
                      <input type="text" className="lsOptionInput" placeholder={options.children}/>
                      <button disabled={options.children < 1} className="decreaseBtn" onClick={() => handleOptionID("children", "d")}>-</button>
                    </div>
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <div className="idOptions">
                      <button className="increseBtn" onClick={() => handleOptionID("room", "i")}>+</button>
                      <input type="text" className="lsOptionInput" placeholder={options.room}/>
                      <button disabled={options.room <= 1} className="decreaseBtn" onClick={() => handleOptionID("room", "d")}>-</button>
                    </div>
                  </div>

                </div>
            </div>
            <button>Search</button>
          </div>

          <div className="listResult">
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default List