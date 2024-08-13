import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

const Home = () => {

    const [artTools, setArtTools] = useState([]);
    const [artToolDetail, setArtToolDetail] = useState(null);


    const getListArtTools = async () => {
        const res = await axios.get("https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857");
        const data1 = res.data.filter(section => section.limitedTimeDeal !== 0);
        if (res.status === 200) {
            setArtTools(data1);
        }
    }

    useEffect(() => {
        getListArtTools();
    }, []);


    const handleView = (arttools) => {
        setArtToolDetail(arttools);
    }

    const handleClose = () => {
        setArtToolDetail(null);
    }


    return (
        <div className="container">
            {artTools && artTools.map((arttools) => (
                <div className="card" key={arttools.id}>
                    <button onClick={() => handleView(arttools)}><img src={arttools.image} alt={arttools.id} /></button>
                    <h3>{arttools.artName}</h3>
                    <h3>{arttools.price}</h3>
                    <h3>{String(arttools.glassSurface)}</h3>
                    <h3>{arttools.brand}</h3>
                </div>
            ))}

            {artToolDetail && (
                
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClose}>
                                &times;
                            </span>
                            <img src={artToolDetail.image} alt={artToolDetail.id} />
                            <h2>ID: {artToolDetail.id}</h2>
                            <p>Art name: {artToolDetail.artName}</p>
                            <p>Price: {artToolDetail.price}</p>
                            <p>Description: {artToolDetail.description}</p>
                            <p>Limited Time Deal: {((artToolDetail.limitedTimeDeal) * 100) + "%"}</p>
                            <p>Brand: {artToolDetail.brand}</p>
                            <p>Glass surface: {String(artToolDetail.glassSurface)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Home;