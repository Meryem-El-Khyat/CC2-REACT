import { useEffect, useState, useContext } from "react";
import { fetchLivres } from "../services/api";
import { EmpruntContext } from "../context/EmpruntContext";

const ListLivre = () => {
    const [livres, setLivres] = useState([]);
    const { emprunts, empruntLivre, returnLivre } = useContext(EmpruntContext);

    useEffect(() => {
        const getLivres = async () => {
            try {
                const data = await fetchLivres();
                setLivres(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des livres:", error);
            }
        };
        getLivres();
    }, []);

    const handleEmprunter = (livreId) => {
        setLivres(livres.map((livre) =>
            livre.id === livreId ? { ...livre, disponible: false } : livre
        ));
        empruntLivre(livreId);
    };

    const handleReturn = (livreId) => {
        setLivres(livres.map((livre) =>
            livre.id === livreId ? { ...livre, disponible: true } : livre
        ));
        returnLivre(livreId);
    };

    return (
        <div className="container mt-4">
            <h2 >La Liste des Livres </h2>
            <div className="row">
                {livres.map((livre) => (
                    <div key={livre.id} className="col-md-3 mb-4">
                        <div className="card" style={{ height: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title">{livre.titre}</h5>
                                <p className="card-text">Par {livre.auteur}</p>
                                <p className="card-text">
                                    {livre.disponible ? "Disponible" : "Non Disponible"}
                                </p>
                                <div>
                                    {livre.disponible && !emprunts.includes(livre.id) ? (
                                        <button
                                            style={{
                                                backgroundColor: '#28a745', // Vert
                                                color: '#FFF',
                                                margin: '10px',
                                                width: '100%'
                                            }}
                                            onClick={() => handleEmprunter(livre.id)}
                                        >
                                            Emprunter Livre
                                        </button>
                                    ) : emprunts.includes(livre.id) ? (
                                        <button
                                            style={{
                                                backgroundColor: '#dc3545', // Rouge
                                                color: '#FFF',
                                                margin: '10px',
                                                width: '100%'
                                            }}
                                            onClick={() => handleReturn(livre.id)}
                                        >
                                            Rendre Livre
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-secondary"
                                            disabled
                                            style={{
                                                margin: '10px',
                                                width: '100%',
                                                backgroundColor: 'gray',
                                                color: '#FFF'
                                            }}
                                        >
                                            Non Disponible
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListLivre;
