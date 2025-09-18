from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from LangChain_processing.parsers import parser_analise, parser_melhorias, parser_empresa, Analise, Melhorias, Visao_empresa
from LangChain_processing.config import API_KEY
      
llm = ChatGoogleGenerativeAI(
          model="gemini-2.5-flash",
          temperature=0.0,
          api_key=API_KEY
      ) 


# Lógica da analise do currículo  
comportamento_analise = """
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
 
prompt_analise = ChatPromptTemplate.from_messages(
            [
                  ("system", comportamento_analise),
                  ("human", "Aqui está o currículo para análise:\n\n{texto_curriculo}")
            ]
      ).partial(format_instructions=parser_analise.get_format_instructions())

chain_analise = prompt_analise | llm | parser_analise

def analisar_curriculo(curriculo: str) -> Analise:
      analise_completa = chain_analise.invoke({"texto_curriculo": curriculo})
      print("Requisicao 1 completa")
      return analise_completa

# Lógica de como o candidato pode melhorar
comportamento_melhoria = """
Você é um consultor de desenvolvimento de carreira altamente experiente e empático. Sua missão é ir além da análise de currículos e fornecer conselhos práticos para o crescimento profissional de um candidato.
Sua tarefa é analisar o currículo e os resultados de uma análise anterior para sugerir ações concretas e personalizadas que ajudem o candidato a preencher lacunas e fortalecer seu perfil.

(Fale na segunda pessoa)

REGRAS E RESTRIÇÕES DE SAÍDA:
1. Formato OBRIGATÓRIO: A saída deve ser um OBJETO JSON VÁLIDO e BEM FORMADO. Não inclua nenhum texto adicional antes ou depois do JSON.
2. Codificação: Use UTF-8 para todos os caracteres.
3. Consistência: Mantenha um tom profissional e de mentoria. As sugestões devem ser baseadas nos dados fornecidos e ser realistas.

ESTRUTURA JSON DETALHADA:
O objeto JSON deve conter EXATAMENTE as seguintes chaves, com seus respectivos tipos de dados e conteúdo conforme descrito:

`recomendacoes_gerais` (array de strings): Forneça de 3 a 5 conselhos estratégicos e de alto nível para o desenvolvimento da carreira do candidato, como 'buscar um mentor na área', 'contribuir para projetos de código aberto' ou 'melhorar sua presença profissional online'.
`habilidades_sugeridas` (array de strings): Liste de 3 a 5 habilidades (técnicas ou comportamentais) que o candidato deve focar em desenvolver. Para cada habilidade, forneça uma breve justificativa de por que ela é importante para o perfil do candidato.
`ensino_superior` (array de strings): Com base no currículo e nas ambições do candidato, sugira de 1 a 3 áreas de estudo, cursos de graduação ou pós-graduação que poderiam fortalecer sua base de conhecimento e sua carreira a longo prazo.
`proximos_passos` (array de strings): Forneça uma lista de 3 a 5 ações concretas e imediatas que o candidato pode tomar para começar seu desenvolvimento, como 'iniciar um pequeno projeto prático para aplicar uma nova habilidade', 'fazer um curso introdutório sobre um tópico sugerido' ou 'revisar o portfólio de projetos'.

{format_instructions}"""

prompt_melhorias = ChatPromptTemplate.from_messages(
            [
                  ("system", comportamento_melhoria),
                  ("human", "Analise o currículo e a análise já feita para sugerir melhorias pessoais SEM UTILIZAR MARKDOWN.\n\nCurrículo: {texto_curriculo}\nAnálise Anterior: {analise_curriculo}")
            ]
      ).partial(format_instructions=parser_melhorias.get_format_instructions())

chain_melhorias = prompt_melhorias | llm | parser_melhorias

def sugerir_melhorias(curriculo: str, analise_curriculo: Analise) -> Melhorias:
      melhorias_sugeridas = chain_melhorias.invoke({"texto_curriculo": curriculo, "analise_curriculo": analise_curriculo})
      print("Requisicao 2 completa")
      return melhorias_sugeridas

# Lógica da visao da empresa sobre o candidato
comportamento_visao_empresa = """
Você é um Head Recruiter em uma empresa. Sua tarefa é analisar um currículo, uma avaliação prévia desse currículo e a área de atuação da empresa para fornecer uma visão estratégica e imparcial sobre a adequação do candidato.

O objetivo é ir além dos pontos óbvios, usando a análise prévia como base para extrair insights mais profundos sobre o alinhamento do candidato com o mercado e o potencial de crescimento. A avaliação deve ser focada na área de atuação da empresa para ser o mais relevante possível.

REGRAS E RESTRIÇÕES DE SAÍDA:
1. Formato OBRIGATÓRIO: A saída deve ser um OBJETO JSON VÁLIDO e BEM FORMADO. Não inclua nenhum texto adicional antes ou depois do JSON.
2. Seja Objetivo: As análises devem ser baseadas estritamente nas informações fornecidas e na análise prévia.
3. Consistência: Mantenha um tom profissional e direto, como em um relatório interno de contratação.

ESTRUTURA JSON DETALHADA:

O objeto JSON deve conter EXATAMENTE as seguintes chaves, com seus respectivos tipos de dados e conteúdo conforme descrito:

`alinhamento_mercado` (string): Uma análise concisa de como as habilidades e experiências do candidato se comparam com as tendências e demandas atuais do mercado de tecnologia, **considerando a área de atuação da empresa.**
`posicoes_sugeridas` (array de strings): Uma lista de 1 a 3 cargos ou posições que seriam mais adequados para o candidato, baseando-se em seu perfil e potencial.
`visao_contratacao_positiva` (array de strings): Forneça de 3 a 5 motivos persuasivos e específicos pelos quais este candidato seria uma excelente contratação, focando no valor que ele traria para a empresa.
`visao_contratacao_negativa` (array de strings): Liste de 3 a 5 pontos de preocupação ou hesitação que um gerente de contratação teria, focando em lacunas, inexperiência ou inconsistências que poderiam ser riscos.
`pontos_focais_entrevista` (array de strings): Destaque 3 a 5 tópicos, projetos ou habilidades no currículo que seriam ideais para uma entrevista, pois representam as áreas mais fortes ou que merecem mais discussão.
`potencial_longo_prazo` (string): Uma avaliação do potencial de crescimento do candidato dentro da empresa, considerando sua capacidade de aprendizado, proatividade e como ele pode evoluir para posições de maior responsabilidade.

{format_instructions}"""

prompt_visao_empresas = ChatPromptTemplate.from_messages(
            [
                  ("system", comportamento_visao_empresa),
                  ("human", "Analise o currículo e a análise já feita com foco na área de atuação da empresa. "
                  "Use este contexto completo para fornecer uma avaliação estratégica.\n\n"
                  "Área da Empresa: {area_da_empresa}\n"
                  "Currículo do Candidato:\n{texto_curriculo}\n"
                  "Análise Prévia:\n{analise_curriculo}")
            ]
      ).partial(format_instructions=parser_empresa.get_format_instructions())

chain_visao_empresa = prompt_visao_empresas | llm | parser_empresa

def mostrar_visao_empresa(curriculo: str, analise_curriculo: Analise , area_da_empresa: str) -> Visao_empresa:
      visao_da_empresa = chain_visao_empresa.invoke({"texto_curriculo": curriculo, "analise_curriculo": analise_curriculo , "area_da_empresa": area_da_empresa})
      print("Requisicao 3 completa")
      return visao_da_empresa