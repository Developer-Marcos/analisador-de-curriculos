from helpers import extrair_dados
from LLM_service import analisar_curriculo, sugerir_melhorias, mostrar_visao_empresa

# Programar rotas do flask

# Usando a aplicacao:
curriculo = "Project/backend/arquivos_temporarios/Currículo-Marcos Gabriel.pdf"
dados_curriculo = extrair_dados(curriculo)


analise_completa = analisar_curriculo(dados_curriculo)
# Acessando os atributos -> dict
#print(analise_completa['resumo_curriculo'], '\n')
#print(analise_completa['resumo_candidato'], '\n')
#print(analise_completa['pontos_fortes'], '\n')
#print(analise_completa['pontos_fracos'], '\n')
#print(analise_completa['sugestoes_melhoria'])

#melhorias_sugeridas = sugerir_melhorias(curriculo=dados_curriculo, analise_curriculo=analise_completa)
# Acessando os atributos -> dict
#print(melhorias_sugeridas['recomendacoes_gerais'], '\n')
#print(melhorias_sugeridas['habilidades_sugeridas'], '\n')
#print(melhorias_sugeridas['ensino_superior'], '\n')
#print(melhorias_sugeridas['proximos_passos'], '\n')

area_empresa_teste = "Financas"
visao_da_empresa = mostrar_visao_empresa(curriculo=dados_curriculo, analise_curriculo=analise_completa, area_da_empresa=area_empresa_teste)
# Acessando o alinhamento de mercado
print("\n[ Alinhamento de Mercado ]")
print(visao_da_empresa['alinhamento_mercado'])

# Acessando as posições sugeridas
print("\n[ Posições Sugeridas ]")
for posicao in visao_da_empresa['posicoes_sugeridas']:
    print(f"- {posicao}")

# Acessando a visão de contratação positiva
print("\n[ Motivos para Contratar ]")
for motivo in visao_da_empresa['visao_contratacao_positiva']:
    print(f"- {motivo}")

# Acessando a visão de contratação negativa
print("\n[ Possíveis Preocupações ]")
for preocupacao in visao_da_empresa['visao_contratacao_negativa']:
    print(f"- {preocupacao}")

# Acessando os pontos focais para entrevista
print("\n[ Pontos para Focar na Entrevista ]")
for ponto in visao_da_empresa['pontos_focais_entrevista']:
    print(f"- {ponto}")

# Acessando o potencial a longo prazo
print("\n[ Potencial a Longo Prazo ]")
print(visao_da_empresa['potencial_longo_prazo'])