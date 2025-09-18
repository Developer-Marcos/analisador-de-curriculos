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

    const [isVisaoGeralExpanded, setIsVisaoGeralExpanded] = useState(false);
    const [isMelhoriasExpanded, setIsMelhoriasExpanded] = useState(false);
    const [isVisaoEmpresaExpanded, setIsVisaoEmpresaExpanded] = useState(false);

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
        <section className="Formulario flex flex-col items-center">
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

<div className={`
    mt-8 transition-all duration-500 ease-in-out w-full
    ${(isLoading || resultado) ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}
`}>
    <div className="p-4">
        {isLoading && (
            <div className="flex justify-center">
                <Carregando />
            </div>
        )}
        
        {!isLoading && resultado && (
            <>
                <h2 className="text-[#343434]">Análise completa do currículo enviado</h2>
                {arquivo && <p className="text-[#707070]">{arquivo.name}</p>}
                
                <div 
                    className="mt-4 bg-[#D9D9D9]/44 cursor-pointer rounded"
                    onClick={() => setIsVisaoGeralExpanded(!isVisaoGeralExpanded)}
                >
                    <h3 className="flex items-center justify-between p-2 text-[#343434] ">
                        Visão geral do currículo
                        <span className="text-[#707070]">{isVisaoGeralExpanded ? '▲' : '▼'}</span>
                    </h3>
                </div>
                <div 
                    className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${isVisaoGeralExpanded ? 'max-h-[9999px]' : 'max-h-0'}
                    `}
                >
                    <div className="p-2 bg-[#D9D9D9]/22">
                        <SubtopicosAnaliseCompleta analise={resultado.analise_completa} />
                    </div>
                </div>
                
                <div 
                    className="mt-4 bg-[#D9D9D9]/44 cursor-pointer rounded"
                    onClick={() => setIsMelhoriasExpanded(!isMelhoriasExpanded)}
                >
                    <h3 className="flex items-center justify-between p-2 text-[#343434]">
                        Melhorias Sugeridas
                        <span className="text-[#707070]">{isMelhoriasExpanded ? '▲' : '▼'}</span>
                    </h3>
                </div>
                <div 
                    className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${isMelhoriasExpanded ? 'max-h-[9999px]' : 'max-h-0'}
                    `}
                >
                    <div className="p-2">
                        <SubtopicosMelhorias melhorias={resultado.melhorias_sugeridas} />
                    </div>
                </div>

                <div 
                    className="mt-4 bg-[#D9D9D9]/44 cursor-pointer rounded"
                    onClick={() => setIsVisaoEmpresaExpanded(!isVisaoEmpresaExpanded)}
                >
                    <h3 className="flex items-center justify-between p-2 text-[#343434]">
                        Visão da Empresa
                        <span className="text-[#707070]">{isVisaoEmpresaExpanded ? '▲' : '▼'}</span>
                    </h3>
                </div>
                <div 
                    className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${isVisaoEmpresaExpanded ? 'max-h-[9999px]' : 'max-h-0'}
                    `}
                >
                    <div className="p-2">
                        <p><strong>Área da Empresa:</strong> {resultado.areaDaEmpresa}</p>
                        <SubtopicosVisaoEmpresa visao={resultado.visao_da_empresa} />
                    </div>
                </div>
            </>
        )}
    </div>
</div>
        </section>
    )
}

const SubtopicosAnaliseCompleta = ({ analise }) => {
    const [isPontosFortesExpanded, setIsPontosFortesExpanded] = useState(false);
    const [isPontosFracosExpanded, setIsPontosFracosExpanded] = useState(false);
    const [isResumoCandidatoExpanded, setIsResumoCandidatoExpanded] = useState(false);
    const [isResumoCurriculoExpanded, setIsResumoCurriculoExpanded] = useState(false);

    return (
        <div className="space-y-4">
            <div className="p-2 pb-0.5 rounded-md cursor-pointer" onClick={() => setIsPontosFortesExpanded(!isPontosFortesExpanded)}>
                <h4 className="flex justify-between items-center pb-2 text-[#4A4A4A]">
                    Pontos Fortes
                    <span className="text-[#707070]">{isPontosFortesExpanded ? '▲' : '▼'}</span>
                </h4>
                <hr className="h-0.5 bg-[#707070]/50 border-0" />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPontosFortesExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-8 space-y-2 text-[#4A4A4A] mb-4">
                    {analise.pontos_fortes.map((ponto, index) => (
                        <li key={index}>{ponto}</li>
                    ))}
                </ul>
                 <hr className="h-0.5 bg-[#707070]/50 border-0" />
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsPontosFracosExpanded(!isPontosFracosExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Pontos Fracos
                    <span>{isPontosFracosExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPontosFracosExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {analise.pontos_fracos.map((ponto, index) => (
                        <li key={index}>{ponto}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsResumoCandidatoExpanded(!isResumoCandidatoExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Resumo do Candidato
                    <span>{isResumoCandidatoExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isResumoCandidatoExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <p className="p-2 text-[#4A4A4A]">{analise.resumo_candidato}</p>
            </div>
            
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsResumoCurriculoExpanded(!isResumoCurriculoExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Resumo do Currículo
                    <span>{isResumoCurriculoExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isResumoCurriculoExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <p className="p-2 text-[#4A4A4A]">{analise.resumo_curriculo}</p>
            </div>
        </div>
    );
};

const SubtopicosMelhorias = ({ melhorias }) => {
    const [isEnsinoSuperiorExpanded, setIsEnsinoSuperiorExpanded] = useState(false);
    const [isHabilidadesExpanded, setIsHabilidadesExpanded] = useState(false);
    const [isProximosPassosExpanded, setIsProximosPassosExpanded] = useState(false);
    const [isRecomendacoesGeraisExpanded, setIsRecomendacoesGeraisExpanded] = useState(false);

    return (
        <div className="space-y-4">
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsEnsinoSuperiorExpanded(!isEnsinoSuperiorExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Ensino Superior
                    <span>{isEnsinoSuperiorExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isEnsinoSuperiorExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {melhorias.ensino_superior.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsHabilidadesExpanded(!isHabilidadesExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Habilidades Sugeridas
                    <span>{isHabilidadesExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isHabilidadesExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {melhorias.habilidades_sugeridas.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsProximosPassosExpanded(!isProximosPassosExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Próximos Passos
                    <span>{isProximosPassosExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isProximosPassosExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {melhorias.proximos_passos.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsRecomendacoesGeraisExpanded(!isRecomendacoesGeraisExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Recomendações Gerais
                    <span>{isRecomendacoesGeraisExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isRecomendacoesGeraisExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {melhorias.recomendacoes_gerais.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const SubtopicosVisaoEmpresa = ({ visao }) => {
    const [isAlinhamentoMercadoExpanded, setIsAlinhamentoMercadoExpanded] = useState(false);
    const [isPontosFocaisExpanded, setIsPontosFocaisExpanded] = useState(false);
    const [isPosicoesSugeridasExpanded, setIsPosicoesSugeridasExpanded] = useState(false);
    const [isPotencialLongoPrazoExpanded, setIsPotencialLongoPrazoExpanded] = useState(false);
    const [isVisaoContratacaoNegativaExpanded, setIsVisaoContratacaoNegativaExpanded] = useState(false);
    const [isVisaoContratacaoPositivaExpanded, setIsVisaoContratacaoPositivaExpanded] = useState(false);

    return (
        <div className="space-y-4">
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsAlinhamentoMercadoExpanded(!isAlinhamentoMercadoExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Alinhamento com o Mercado
                    <span>{isAlinhamentoMercadoExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isAlinhamentoMercadoExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <p className="p-2 text-[#4A4A4A]">{visao.alinhamento_mercado}</p>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsPontosFocaisExpanded(!isPontosFocaisExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Pontos Focais para Entrevista
                    <span>{isPontosFocaisExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPontosFocaisExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {visao.pontos_focais_entrevista.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsPosicoesSugeridasExpanded(!isPosicoesSugeridasExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Posições Sugeridas
                    <span>{isPosicoesSugeridasExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPosicoesSugeridasExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {visao.posicoes_sugeridas.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsPotencialLongoPrazoExpanded(!isPotencialLongoPrazoExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Potencial a Longo Prazo
                    <span>{isPotencialLongoPrazoExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPotencialLongoPrazoExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <p className="p-2 text-[#4A4A4A]">{visao.potencial_longo_prazo}</p>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsVisaoContratacaoNegativaExpanded(!isVisaoContratacaoNegativaExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Visão de Contratação Negativa
                    <span>{isVisaoContratacaoNegativaExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isVisaoContratacaoNegativaExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {visao.visao_contratacao_negativa.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-[#EFEFEF] p-4 rounded-md cursor-pointer" onClick={() => setIsVisaoContratacaoPositivaExpanded(!isVisaoContratacaoPositivaExpanded)}>
                <h4 className="font-bold flex justify-between items-center">
                    Visão de Contratação Positiva
                    <span>{isVisaoContratacaoPositivaExpanded ? '▲' : '▼'}</span>
                </h4>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isVisaoContratacaoPositivaExpanded ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <ul className="list-disc ml-6 space-y-2 text-[#4A4A4A]">
                    {visao.visao_contratacao_positiva.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Formulario;