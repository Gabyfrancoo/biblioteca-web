import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="marca">Biblioteca Web</span>
        <Link to="/autores">Autores</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/autores" replace />} />
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}