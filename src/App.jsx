import React from "react";
import Header from "./components/Header"
import Main from "./components/Main"
import './chef.css';

export default function App() {
    return (
        <div>
            <Header />
            <main className="container">
                <Main />
            </main>
        </div>
    )
}