from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_community.document_loaders import PyPDFLoader, UnstructuredWordDocumentLoader, TextLoader
from pydantic import BaseModel, Field
from config import API_KEY
import os

def extrair_dados(caminho_arquivo: str) -> str:
      extensao_arquivo = os.path.splitext(caminho_arquivo)[1].lower()
      documentos = []

      try:
            if extensao_arquivo == ".pdf":
                  dados_extraidos = PyPDFLoader(caminho_arquivo)
            elif extensao_arquivo == ".docx":
                  dados_extraidos = UnstructuredWordDocumentLoader(caminho_arquivo)
            elif extensao_arquivo == ".txt":
                  dados_extraidos = TextLoader(caminho_arquivo)
            else:
                  raise ValueError("Documento inválido, Por favor, use PDF, DOCX ou TXT.")

            documentos = dados_extraidos.load()

      except Exception as error:
            raise ValueError(f"Erro ao carregar o arquivo: {caminho_arquivo}: {error}")
      
      dados_completos = "\n\n".join([doc.page_content for doc in documentos])

      if not dados_completos.strip():
            raise ValueError("O arquivo não contém texto ou não pôde ser extraído.")
      
      return dados_completos
      

      

class Analise(BaseModel):
            resumo_curriculo: str = Field(description="Resumo do currículo feito de forma eficaz")
            resumo_candidato: str = Field(description="Resumo do candidato com base no seu currículo")
            pontos_fortes: list[str] = Field(description="Pontos fortes do candidato baseando-se no seu currículo")
            pontos_fracos: list[str] = Field(description="Pontos fracos do candidato com base no seu currículo")
            sugestoes_melhoria:  list[str] = Field(description="Como o candidato pode melhorar o seu currículo")

parser = JsonOutputParser(pydantic_object=Analise)

llm = ChatGoogleGenerativeAI(
          model="gemini-2.5-flash",
          temperature=0.0,
          api_key=API_KEY
      ) 
      
comportamento = """
      Você é um especialista em análise de currículos, com profundo conhecimento em recursos humanos, recrutamento e desenvolvimento de carreira. Sua principal missão é atuar como um mentor, fornecendo feedback construtivo, claro e acionável sobre currículos.
      Realize uma análise abrangente, imparcial e realista , identificando os aspectos mais relevantes do documento e oferecendo insights valiosos para o candidato.

      REGRAS E RESTRIÇÕES DE SAÍDA:
      1. Formato OBRIGATÓRIO: A saída deve ser um OBJETO JSON VÁLIDO e BEM FORMADO. Não inclua nenhum texto adicional antes ou depois do JSON.
      2. Codificação: Use UTF-8 para todos os caracteres.
      3. Precisão: Seja conciso e direto em cada ponto, mas garanta que a informação seja completa e útil.
      4. Linguagem: Mantenha um tom profissional, encorajador e objetivo.

      ESTRUTURA JSON DETALHADA:

      O objeto JSON deve conter EXATAMENTE as seguintes chaves, com seus respectivos tipos de dados e conteúdo conforme descrito:

      `resumo_curriculo` (string): Um resumo objetivo e direto do CONTEÚDO do currículo Foco nas principais seções e informações apresentadas no documento (ex: "Currículo de profissional com X anos de experiência em Y, destacando Z habilidades e Q formação acadêmica."). Não faça inferências sobre o candidato, apenas o que está no papel.
      `resumo_candidato` (string): Uma descrição do PERFIL PROFISSIONAL do candidato, baseada em suas experiências, habilidades e objetivos implícitos no currículo. Atribua um perfil (ex: "Profissional proativo, orientado a resultados, com forte aptidão para liderança de equipes e expertise em...", ou "Candidato júnior com grande potencial em...").
      `pontos_fortes` (array de strings): Uma lista de pontos positivos e elementos bem executados no currículo. Pense no que o currículo faz bem para atrair a atenção de um recrutador. (Ex: "Uso de métricas e resultados", "Experiência relevante em empresas de renome", "Clareza na descrição de responsabilidades").
      `pontos_fracos` (array de strings): Uma lista de áreas que necessitam de melhoria ou que podem ser consideradas deficiências no currículo. Pense no que pode ser um "red flag" ou o que está faltando. (Ex: "Falta de palavras-chave para a área desejada", "Descrição genérica de responsabilidades", "Erros gramaticais ou de digitação").
      `sugestoes_melhoria` (array de strings): Uma lista de recomendações PRÁTICAS e ACIONÁVEIS para o candidato otimizar o currículo. Estas sugestões devem estar diretamente relacionadas aos pontos fracos identificados, oferecendo um caminho claro para o aprimoramento. (Ex: "Quantificar conquistas com números e percentuais", "Personalizar o resumo para a vaga desejada", "Revisar cuidadosamente a gramática e ortografia").
      
      {format_instructions}
      """
 
prompt = ChatPromptTemplate.from_messages(
            [
                  ("system", comportamento),
                  ("human", "Aqui está o currículo para análise:\n\n{texto_curriculo}")
            ]
      ).partial(format_instructions=parser.get_format_instructions())

chain = prompt | llm | parser

def analisar_curriculo(curriculo: str) -> str:
      analise_completa = chain.invoke({"texto_curriculo": curriculo})
      return analise_completa