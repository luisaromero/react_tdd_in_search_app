import { GithubSearchPage } from './Components/github-search-page';
import ErrorBoundary from './Components/error-boundary/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <GithubSearchPage />
    </ErrorBoundary>

  );
}

export default App;
