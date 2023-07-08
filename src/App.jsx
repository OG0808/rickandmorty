import { useEffect, useState } from "react";
import axios from "axios";
import getRaondomNumber from "./utils/getRaondomNumber";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormInput from "./components/FormInput";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import Swal from 'sweetalert2'

function App() {
  //? Manejo de estados para la paginacion =================
  //  const [infoPage, setInfoPage] = useState({})

  //  const [itemPagination, setItemPagination] = useState([])
  //? Manejo de estados =================================
  const [location, setLocation] = useState();
  const [idLocation, setIdLocation] = useState(getRaondomNumber(126));
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  //?manejo de peticione con la api =========================
// useEffect(() => {
//   const items = [];
//   for (let i = 1; i < infoPage.length; i++) {
           
//   }
// }, [infoPage])


  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/location/${idLocation}`)
      .then((response) => {
        setLocation(response.data);
        // setInfoPage(response.data.residents);
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

  return (
    <div className="main__conatiner">
      <header className="main_header"></header>

      <FormInput setIdLocation={setIdLocation} />
      {loading ? (
      <div className="container__loading">
      <Loading/>
      </div>
        
      ) : hasError ? (
      
          <ErrorPage/>
              
      ) : (
        <>
          <LocationInfo location={location} />
          <div className="container__card">
            {location?.residents.map((residents) => (
              <ResidentCard key={residents} residents={residents} />
            ))}
          </div>
        </>
      )}
      {/* <div>
      <Pagination>
      <Pagination.Prev />
 
      <Pagination.Next />
    </Pagination>
      </div> */}
    </div>
  );
}

export default App;
