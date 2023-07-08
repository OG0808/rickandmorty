import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ResidentCard = ({ residents }) => {
  const [character, setCharacter] = useState();

  useEffect(() => {
    axios
      .get(residents)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <motion.article
   
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}
    
      className="resident"
    >
      <header className="resident__header">
        <img className="resident__image" src={character?.image} alt="" />
        <div className="resident__status">
          <div className={`resident__status-circle ${character?.status}`}></div>
          <span className="resident__status-value">{character?.status}</span>
        </div>
      </header>
      <section className="resident__name">
        <h3>{character?.name}</h3>
        <hr />
      </section>
      <ul className="resient__description">
        <li>
          <span className="resident__value">Specie:</span>
          <span className="resident__res"> {character?.species}</span>
        </li>
        <li>
          <span className="resident__value">Origin:</span>
          <span className="resident__res"> {character?.origin.name}</span>
        </li>
        <li>
          <span className="resident__value">Episodes where appear:</span>
          <span className="resident__res"> {character?.episode.length}</span>
        </li>
      </ul>
    </motion.article>
  );
};

export default ResidentCard;
