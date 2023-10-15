import { useEffect, useRef } from 'react';
import { useScreenClass } from 'react-grid-system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import Redirection from './components/Redirect';
import DirectionPage from './pages/MyPage';
import useRootData from './hooks/useRootData';
import SearchPage from './pages/SearchPage';

const App = () => {
  const componentRef = useRef(null);
  const currentScreenClass = useScreenClass(componentRef);

  const { changeScreenClass } = useRootData(({ appStore }) => ({
    changeScreenClass: appStore.changeScreenClass,
  }));

  useEffect(() => {
    changeScreenClass(
      ['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(currentScreenClass)
        ? 'xl'
        : 'xs',
    );
  }, [currentScreenClass]);

  return (
    <Router>
      <Routes>
        <Route path="/mock" element={<MockPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/myPage" element={<DirectionPage />} />
        <Route path="/oauth/kakao/callback" element={<Redirection />} />
        <Route path="/searchPage" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
