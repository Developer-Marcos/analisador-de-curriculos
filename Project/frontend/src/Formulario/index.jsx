import { useState } from "react";
import ArquivoPlaceHolder from "../ArquivoPlaceHolder";
import Enviar from "../Enviar";
import ListaSuspensa from "../ListaSuspensa";
import Carregando from "../Carregando";

const Formulario = () => {
    const [valorLista, setValorLista] = useState('')
    const [arquivo, setArquivo] = useState(null)
    const [resultado, setResultado] = useState(null)
    const [mensagem, setMensagem] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const aoMudarLista = (valor) => {
        setValorLista(valor)
    }

    const aoMudarArquivo = (novoArquivo) => {
        setArquivo(novoArquivo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!valorLista && !arquivo) {
            setMensagem('Por favor, escolha a área e um arquivo.')
            return
        }
        if (!valorLista) {
            setMensagem('Por favor, escolha uma área.')
            return
        }
        if (!arquivo) {
            setMensagem('Por favor, escolha um arquivo.')
            return
        }

        setResultado(null)
        setMensagem('')
        setIsLoading(true)

        const dadosFormulario = new FormData()
        dadosFormulario.append('stringData', valorLista)
        dadosFormulario.append('file', arquivo)

        try {
            const response = await fetch('http://127.0.0.1:5000/api/processar', {
                method: 'POST',
                body: dadosFormulario,
            })

            const dados = await response.json()
            setMensagem(dados.message || dados.error)
            if (dados) {
                setResultado(dados)
            }
        } catch (error) {
            setMensagem('Erro ao enviar dados')
            console.error('Erro: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="Formulario">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start gap-8">
                <div className="mr-24">
                    <ListaSuspensa aoAlterar={aoMudarLista} />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <ArquivoPlaceHolder aoAlterar={aoMudarArquivo} />
                    <Enviar disabled={isLoading}/>
                    {mensagem && <p className="text-[#FF4040]">{mensagem}</p>}
                </div>
            </form>

            {isLoading && (
                <div className="flex justify-center mt-8">
                    <Carregando />
                </div>
            )}

            {!isLoading && resultado && (
                <div>
                    <h2>Análise do Currículo</h2>
                    <p><strong>Área da Empresa:</strong> {resultado.areaDaEmpresa}</p>

                    <div>
                        <h3>Análise Completa</h3>
                        <pre>{JSON.stringify(resultado.analise_completa, null, 2)}</pre>
                    </div>

                    <div>
                        <h3>Melhorias Sugeridas</h3>
                        <pre>{JSON.stringify(resultado.melhorias_sugeridas, null, 2)}</pre>
                    </div>

                    <div>
                        <h3>Visão da Empresa</h3>
                        <pre>{JSON.stringify(resultado.visao_da_empresa, null, 2)}</pre>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Formulario