import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="marca">Biblioteca Web</span>
        <Link to="/">Início</Link>
      </nav>
      <main>
        <h2>Biblioteca Web</h2>
      </main>
    </BrowserRouter>
  );
}