import React, { useEffect, useState } from 'react';
import * as S from './style'
import { useHistory } from 'react-router-dom';

function Repositories() {
  const [ repositories, setRespositories ] = useState([])
  const history = useHistory();

  useEffect(() => {
    let repositoriesName = localStorage.getItem('repositoriesName');

    if (repositoriesName) {
      repositoriesName = JSON.parse(repositoriesName);
      setRespositories(repositoriesName);
      localStorage.clear();
    } else {
      history.push("/")
    }
  }, [history])

  return (
    <S.Container>
      <S.Title>Respositories</S.Title>
      <S.List>
        {repositories.map((repository, i) => {
          return (
            <S.ListItem key={i}>Repositório: { repository }</S.ListItem>)
        })}
      </S.List>
      <S.LinkHome to="/">Voltar</S.LinkHome>
    </S.Container>
  )
}

export default Repositories;