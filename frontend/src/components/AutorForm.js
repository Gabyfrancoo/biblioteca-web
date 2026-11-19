import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { autorService } from '../services/api';

const vazio = { nome: '', nacionalidade: '', dataNascimento: '' };

export default function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autor, setAutor] = useState(vazio);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      autorService.buscar(id)
        .then((r) => setAutor({ ...vazio, ...r.data, dataNascimento: r.data.dataNascimento || '' }))
        .catch(() => setErro('Autor não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setAutor({ ...autor, [e.target.name]: e.target.value });

  const salvar = async (e) => {
    e.preventDefault();
    const dados = { ...autor, dataNascimento: autor.dataNascimento || null };
    try {
      if (id) await autorService.atualizar(id, dados);
      else await autorService.criar(dados);
      navigate('/autores');
    } catch (err) {
      setErro('Não foi possível salvar. Confira os campos (nome é obrigatório).');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar autor' : 'Novo autor'}</h2>
      {erro && <div className="erro">{erro}</div>}
      <form onSubmit={salvar}>
        <label>Nome
          <input name="nome" value={autor.nome} onChange={alterar} maxLength={100} required />
        </label>
        <label>Nacionalidade
          <input name="nacionalidade" value={autor.nacionalidade || ''} onChange={alterar} maxLength={50} />
        </label>
        <label>Data de nascimento
          <input type="date" name="dataNascimento" value={autor.dataNascimento} onChange={alterar} />
        </label>
        <div className="acoes">
          <button className="btn" type="submit">Salvar autor</button>
          <button className="btn neutro" type="button" onClick={() => navigate('/autores')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
