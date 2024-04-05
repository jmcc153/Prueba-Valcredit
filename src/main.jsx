import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/index.scss'
import { LoginProvider } from 'contexts/LoginContext.jsx'
import { ModalProvider } from 'contexts/modalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </LoginProvider>
)
