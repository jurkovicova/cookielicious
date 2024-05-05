import React from "react";
import { Link } from "react-router-dom";




const Home = () => {
    return (
        <div className="home-container">
            <center>
                <h1 className="title">Welcome to Cookie-Licious!</h1>
                <Link to="/order">
                    <button className="button">Online orders {'>>'}</button>
                </Link>
            </center>
        </div>
    );
};

export default Home;