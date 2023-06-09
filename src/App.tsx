import {BrowserRouter} from 'react-router-dom'
import Header from './Component/Header/Header'
import PageNavigator from './PageNavigator'
import {Provider} from 'react-redux'
import {store} from './Store'
import {CookiesProvider} from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <PageNavigator />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  )
}

export default App
