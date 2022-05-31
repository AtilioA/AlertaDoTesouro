import { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { Container, TextContainer } from './styles';
import { AnimationContainer } from '../SignIn/styles';

function ToS() {
  const tosFilepath = './ToS.md';
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`${tosFilepath}`)
      .then(res => {
        // Couldn't find a type for dinamically imported modules
        // eslint-disable-next-line
        fetch(res.default)
          .then(resFile => resFile.text())
          .then(resContent => setPost(resContent))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
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
