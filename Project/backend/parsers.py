from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

# Estrutura da analise do curriculo feita pela LLM
class Analise(BaseModel):
      resumo_curriculo: str = Field(description="Resumo do currículo feito de forma eficaz")
      resumo_candidato: str = Field(description="Resumo do candidato com base no seu currículo")
      pontos_fortes: list[str] = Field(description="Pontos fortes do candidato baseando-se no seu currículo")
      pontos_fracos: list[str] = Field(description="Pontos fracos do candidato com base no seu currículo")
      sugestoes_melhoria:  list[str] = Field(description="Como o candidato pode melhorar o seu currículo")

parser_analise = JsonOutputParser(pydantic_object=Analise)

# Estrutura das melhorias sugeridas pela LLM
class Melhorias(BaseModel):
      recomendacoes_gerais: list[str] = Field(description="Recomendações gerais e estratégicas que podem refletir no desempenho e na carreira do candidato.")
      habilidades_sugeridas: list[str] = Field(description="Lista de habilidades (técnicas ou comportamentais) que o candidato deve priorizar, com uma breve justificativa para cada.")
      ensino_superior: list[str] = Field(description="Uma lista de graduações ou pós-graduações (se precisar) que o candidato pode buscar para aumentar seu conhecimento.")
      proximos_passos: list[str] = Field(description="Sugestões de ações concretas e imediatas que o candidato pode tomar para iniciar seu desenvolvimento, como 'construir um projeto prático', 'fazer uma pesquisa de mercado' ou 'participar de eventos da área'")

parser_melhorias = JsonOutputParser(pydantic_object=Melhorias)

# Estrutura da visao de empresa feita pela LLM
class Visao_empresa(BaseModel):
      alinhamento_mercado: str = Field(description="Análise de como as habilidades do candidato se alinham com as tendências do mercado.")
      posicoes_sugeridas: list[str] = Field(description="Lista de cargos ou posições para as quais o currículo do candidato é mais adequado.")
      visao_contratacao_positiva: list[str] = Field(description="Lista de motivos pelos quais uma empresa deveria contratar o candidato.")
      visao_contratacao_negativa: list[str] = Field(description="Lista de motivos pelos quais uma empresa poderia hesitar em contratar o candidato.")
      pontos_focais_entrevista: list[str] = Field(description="Tópicos e projetos que um recrutador provavelmente focaria em uma entrevista.")
      potencial_longo_prazo: str = Field(description="Análise do potencial de crescimento do candidato na empresa.")

parser_empresa = JsonOutputParser(pydantic_object=Visao_empresa)
      