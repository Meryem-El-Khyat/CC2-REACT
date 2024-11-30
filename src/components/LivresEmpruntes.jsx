import { useContext, useState, useEffect } from 'react';
import { EmpruntContext } from '../context/EmpruntContext';
import { fetchLivres } from '../services/api'; // Importez votre fonction pour récupérer les livres

const LivresEmpruntes = () => {
  const { emprunts } = useContext(EmpruntContext);
  const [livres, setLivres] = useState([]);

  // Charger les livres depuis l'API
  useEffect(() => {
    const getLivres = async () => {
      try {
        const data = await fetchLivres();
        setLivres(data); // Stocke les livres récupérés dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    };
    getLivres();
  }, []);

  // Filtrer les livres empruntés
  const livresEmpruntes = livres.filter(livre => emprunts.includes(livre.id));

  return (
    <div className="container mt-4">
      
      <h2>Livres Empruntés</h2>
      {livresEmpruntes.length === 0 ? (
        <p>Aucun livre emprunté.</p>
      ) : (
        <ul className="list-group">
          {livresEmpruntes.map((livre) => (
            <li key={livre.id} className="list-group-item">
              <strong>{livre.titre}</strong> par {livre.auteur}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LivresEmpruntes;
