import React, {useState, useEffect} from "react";
import CountrySelect from "../components/CountrySelect";
import CountryInfo from "../components/CountryInfo";
import CountryList from "../components/CountryList";
import FavouriteCountries from "../components/FavouriteCountries";
import TotalPopulation from "../components/TotalPopulation";

const CountryBox = () => {

    const [countries, setCountries] = useState([]);
    const [totalPop, setTotalPop] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [faveCountries, setFaveCountries] = useState([]);

    useEffect( () => {
        getCountries();
    }, []);

    useEffect( () => {
        getTotalPop();
    }, [countries])

    const getCountries = function () {
        fetch('https://restcountries.com/v3.1/all')
            .then (response => response.json())
            .then(data => setCountries(data))

    };

    const getTotalPop = () => {
        const popArray = countries.map((country) => {
            return country.population;
        });

        const total = popArray.reduce((runningTotal, currentValue) => {
            return runningTotal + currentValue
        }, 0)

        setTotalPop(total);
    }

    const onCountrySelected = (country) => {
        setSelectedCountry(country);
    }

    const onFaveCountry = (country) => {
        if (faveCountries.includes(country)) {
            return
        } else {
            const newFaves = [...faveCountries,country];
        setFaveCountries(newFaves);
        }
    };

    return (
        <>
        <TotalPopulation totalPop={totalPop}/>
        {/* <h2>Total population of all countries:{totalPop}</h2> */}
        <FavouriteCountries faveCountries={faveCountries}/>
        {/* <h2>Favourite Countries: {faveCountries}</h2> */}
        <CountrySelect countries={countries} onCountrySelected={onCountrySelected} />
        {selectedCountry ? <CountryInfo country={selectedCountry} onFaveCountry = {onFaveCountry} countries={countries}/>: null}
        <CountryList countries = {countries}/>
        </>
    );


};

export default CountryBox;