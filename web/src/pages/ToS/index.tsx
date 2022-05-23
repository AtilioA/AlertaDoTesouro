import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { Container, TextContainer } from './styles';
import { AnimationContainer } from '../SignIn/styles';

function ToS() {
  const tosFilepath = './ToS.md';
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`${tosFilepath}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  return (
    <Container>
      <TextContainer>
        <AnimationContainer>
          <div className="container">
            <Markdown>{post}</Markdown>
          </div>
        </AnimationContainer>
      </TextContainer>
    </Container>
  );
}

export default ToS;
