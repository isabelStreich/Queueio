import React, { useState, useEffect } from "react";
import "../App.css";
import Navbar from "../component/navbar-component";
import CarteCommerce from "../component/carte-commerce-component";
import Filtre from "../component/filtre-component";

function PageListeCommerces(props) {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("clear");

    const [ListeComplete, setListeComplete] = useState([]);
    const [listeFileAttente, setlisteFileAttente] = useState([]);

    const [maListeCommerces, setMaListeCommerces] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let listeCommerceTemp = await fetchCommerceInfo();
            let mapFile = new Map();

            for (const commerce of listeCommerceTemp) {
                console.log(commerce.id);
                mapFile[commerce.id] = await fetchFileAttente(commerce.id);
            }
            setlisteFileAttente(mapFile);
        }
        fetchData();

        async function fetchCommerceInfo() {
            const response = await fetch("https://queueio.herokuapp.com/");
            const liste = await response.json();
            setListeComplete(liste);
            makeList(liste);
            return liste;
        }

        async function fetchFileAttente(id) {
            const response = await fetch(
                "https://queueio.herokuapp.com/redis/listClient/" + id
            );

            try {
                const liste = await response.json();
                return liste.length;
            } catch (err) {
                return 0;
            }
        }
    }, []);

    const makeList = (liste) => {
        setMaListeCommerces(liste);
    };

    useEffect(() => {
        let searchResult = ListeComplete.filter((commerce) =>
            commerce.nom.toLowerCase().includes(search.toLowerCase())
        );
        if (activeFilter !== "clear") {
            searchResult = searchResult.filter(
                (commerce) => commerce.filtre_id === activeFilter
            );
        }
        setMaListeCommerces(searchResult);
    }, [search, activeFilter]);

    // const onChangeHandler = (id) => {
    //     console.log(id);
    //     setActiveFilter(id);
    // };

    const onClickHandler = (id) => {
        let commerce_id = id;

        props.history.push({
            pathname: "/info-client",
            state: commerce_id,
        });
    };    

    return (
        <div>
            <Navbar />
            <h1 id="bienvenue">Bienvenue!</h1>

            <input
                type="text"
                className="form-control"
                id="input-recherche"
                value={search}
                placeholder="Rechercher des commerces"
                onChange={(e) => setSearch(e.target.value)}
            ></input>

            <h1 className="liste-commerces">Liste de commerces</h1>

            <div className="vue-commerces">
                <div className="div-filtre">
                    {/* <Filtre onChangeHandler={onChangeHandler} /> */}
                </div>

                <div className="conteneur-commerces">
                    {maListeCommerces.map((commerce, index) => (
                        <CarteCommerce
                            nom={commerce.nom}
                            id={commerce.id}
                            addresse={commerce.adresse}
                            key={`commerce-${index}`}
                            nbPersonnesEnFile={listeFileAttente[commerce.id]}
                            tempsAttenteApprox={
                                listeFileAttente[commerce.id] * 5
                            }
                            onClickHandler={onClickHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PageListeCommerces;
