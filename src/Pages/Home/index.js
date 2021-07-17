import React, { useState } from 'react';
import axios from 'axios';
import * as S from './style'
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory()
  const [ usuario, setUsuario ] = useState("")
  const [ erro, setErro ] = useState(false)
  
  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
      const repositories = response.data;
      const respositoriesName = [];
      
      repositories.map((repository) => {
        return(respositoriesName.push(repository.name));
      });

      localStorage.setItem('repositoriesName', JSON.stringify(respositoriesName))
      setErro(false)
      history.push('/repositories')
    })
    .catch(err => {
      setErro(true);
    })
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <h1>{ props.title }</h1>
        <S.Input placeholder="Usuário" className="user" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Usuário não encontrado</S.ErrorMsg>: "" }
    </S.HomeContainer>
  );
}

// class = className no react
// tags devem ter /> no fechamento
// <> </> é uma fragment - uma tag sem nada

export default App;
