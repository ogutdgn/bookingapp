import React from 'react';
import "./Header.css";
import { MdHotel } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { FaTaxi } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineEmojiPeople } from "react-icons/md";

import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { format } from "date-fns";

import { useNavigate } from 'react-router-dom';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Header = ({type}) => {

    const navigate = useNavigate()

    const [openDate, setOpenDate] = useState(false)
    const [destination, setDestination] = useState("")

    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const handleOption = (name, operation) => {
        setOptions(prev => {return{
            ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }})
    }

    const handleSearch = () => {
        if (destination !== ""){
            navigate("/hotels", { state: {destination, date, options}})
        }
    }

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">

                <div className="headerListItem active">
                    <MdHotel/>
                    <span>Stays</span>
                </div>

                <div className="headerListItem">
                    <FaPlane/>
                    <span>Flights</span>
                </div>

                <div className="headerListItem">
                    <AiFillCar/>
                    <span>Car Rentals</span>
                </div>

                <div className="headerListItem">
                    <MdHotel/>
                    <span>Attractions</span>
                </div>

                <div className="headerListItem">
                    <FaTaxi/>
                    <span>Airport Taxis</span>
                </div>

            </div>
            { type !== "list" &&<>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDec">
                    Get rewarded for your travels-unlock instant savings of 10% or more with a free Lamabooking account
                </p>
                <button className="headerBtn">Sign In / Register</button>

                <div className="headerSearch">
                    <div className="headerSerachItem">
                        <MdHotel className='headerIcon'/>
                        <input 
                            type="text" 
                            placeholder='Where are you going?' 
                            className='headerSearchInput'
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>

                    <div className="headerSearchItem">
                        <AiTwotoneCalendar className='headerIcon'/>
                        <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                            minDate={new Date()}
                        />}
                    </div>

                    <div className="headerSearchItem">
                        <MdOutlineEmojiPeople className='headerIcon'/>
                        <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                            { openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button disabled={options.children < 1} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div> }   
                    </div>

                    <div className="headerSerchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </>}
        </div>
    </div>
  )
}

export default Header;