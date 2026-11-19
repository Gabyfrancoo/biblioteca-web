import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

export default function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () =>
    autorService.listar()
      .then((r) => setAutores(r.data))
      .catch(() => setErro('Não foi possível carregar os autores. O backend está no ar?'));

  useEffect(() => { carregar(); }, []);

  const excluir = async (id) => {
    if (!window.confirm('Excluir este autor?')) return;
    try {
      await autorService.deletar(id);
      setErro('');
      carregar();
    } catch (e) {
      setErro(e.response && e.response.status === 409
        ? 'Este autor tem livros cadastrados. Exclua os livros antes.'
        : 'Erro ao excluir o autor.');
    }
  };

  return (
    <div>
      <h2>Autores</h2>
      {erro && <div className="erro">{erro}</div>}
      <p><Link className="btn" to="/autores/novo">Novo autor</Link></p>
      {autores.length === 0 ? (
        <p className="vazio">Nenhum autor cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Nome</th><th>Nacionalidade</th><th>Nascimento</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {autores.map((a) => (
              <tr key={a.id}>
                <td>{a.nome}</td>
                <td>{a.nacionalidade}</td>
                <td>{a.dataNascimento}</td>
                <td className="acoes">
                  <Link className="btn neutro" to={`/autores/editar/${a.id}`}>Editar</Link>
                  <button className="btn perigo" onClick={() => excluir(a.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
