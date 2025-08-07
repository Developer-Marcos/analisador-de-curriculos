from langchain_community.document_loaders import PyPDFLoader, UnstructuredWordDocumentLoader, UnstructuredHTMLLoader, TextLoader
import os

def extrair_dados(caminho_arquivo: str) -> str:
      extensao_arquivo = os.path.splitext(caminho_arquivo)[1].lower()
      documentos = []

      try:
            if extensao_arquivo == ".pdf":
                  try:
                        dados_extraidos = PyPDFLoader(caminho_arquivo)
                        documentos = dados_extraidos.load()

                  except Exception:
                        dados_extraidos = UnstructuredHTMLLoader(caminho_arquivo)
                        documentos = dados_extraidos.load()

            elif extensao_arquivo == ".docx":
                  dados_extraidos = UnstructuredWordDocumentLoader(caminho_arquivo)
                  documentos = dados_extraidos.load()

            elif extensao_arquivo == ".txt":
                  dados_extraidos = TextLoader(caminho_arquivo)
                  documentos = dados_extraidos.load()

            else:
                  raise ValueError("Documento inválido, Por favor, use PDF, DOCX ou TXT.")

      except Exception as error:
            raise ValueError(f"Erro ao carregar o arquivo: {caminho_arquivo}: {error}")
      
      dados_completos = "\n\n".join([doc.page_content for doc in documentos])

      if not dados_completos.strip():
            raise ValueError("O arquivo não contém texto ou não pôde ser extraído.")
      
      return dados_completos