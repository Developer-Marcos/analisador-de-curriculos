import Formulario from "./Formulario"
import LimiteFooter from "./LimiteFooter"
import LimiteHeader from "./LimiteHeader"
import Titulo from "./Titulo"

function App() {
  return (
  <div className="flex flex-col min-h-screen">
      <LimiteHeader />

        <main className="flex-grow flex flex-col items-center p-8">
          <Titulo />
          <Formulario />
        </main>

      <LimiteFooter />
    </div>
  )
}

export default App
