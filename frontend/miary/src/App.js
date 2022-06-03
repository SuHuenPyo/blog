import logo from './logo.svg';
import './App.scss';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

function App() {
  const headerTools = [
   {tools1: '글 쓰기', tools2: '프로필'}
  ]
  return (
    
    <div className="App">
      <Header tools1={headerTools[0].tools1} tools2={headerTools[0].tools2}></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
