import React, { useEffect, useState } from "react";
import axios from "axios";
import getRaondomNumber from "./utils/getRaondomNumber";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormInput from "./components/FormInput";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import Pagination from 'react-bootstrap/Pagination';

function App() {

  //? Manejo de los estados 
  const [location, setLocation] = useState(null);
  const [idLocation, setIdLocation] = useState(getRaondomNumber(126));
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 6;
//? peticion a l api 
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/location/${idLocation}`)
      .then((response) => {
        setLocation(response.data);
        setHasError(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idLocation]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(location?.residents.length / residentsPerPage)) {
      return; 
    }
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="main__container">
        <header className="main_header"></header>
        <div className="container__loading">
          <Loading />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="main__container">
        <header className="main_header"></header>
        <ErrorPage />
      </div>
    );
  }
//? Manejo de las variables de paginacion 
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = location?.residents.slice(indexOfFirstResident, indexOfLastResident);

  return (
    <div className="main__container">
      <header className="main_header"></header>
      <FormInput setIdLocation={setIdLocation} />
      <LocationInfo location={location} />
      <div className="container__card">
        {currentResidents.map((resident) => (
          <ResidentCard key={resident} residents={resident} />
        ))}
      </div>
      {location?.residents.length > residentsPerPage && (
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <Pagination.Next
            disabled={indexOfLastResident >= location?.residents.length}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      )}
    </div>
  );
}

export default App;

