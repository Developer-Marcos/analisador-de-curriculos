from helpers import extrair_dados
from LLM_service import analisar_curriculo

# Programar rotas do flask

# Usando a aplicacao:
curriculo = "caminho/curriculo.pdf"
dados_curriculo = extrair_dados(curriculo)
analise_completa = analisar_curriculo(dados_curriculo)

# Acessando os atributos -> dict
print(analise_completa['resumo_curriculo'], '\n')
print(analise_completa['resumo_candidato'], '\n')
print(analise_completa['pontos_fortes'], '\n')
print(analise_completa['pontos_fracos'], '\n')
print(analise_completa['sugestoes_melhoria'])