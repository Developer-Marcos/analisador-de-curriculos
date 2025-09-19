## Analisador de currículos

###### Este é um projeto que recebe um arquivo (PDF) de currículo e retorna insights sobre o currículo analisado.

Analisa o perfil profissional de um indivíduo e oferece insights para o seu desenvolvimento, com base no currículo. Além disso, apresenta a visão de empresas de qualquer área sobre esse profissional.

**Tudo isso utilizando o LangChain como ferramenta principal para orquestrar uma LLM no processamento das funcionalidades.**
<hr>

### Detalhes do que é retornado:
-  **Análise geral do currículo**:
    - *Pontos Fortes*
    - *Pontos Fracos*
    - *Resumo do Candidato*
    - *Resumo do Currículo*

- **Como o indivíduo pode melhorar**:
    - *Ensino Superior*
    - *Habilidades Sugeridas*
    - *Próximos Passos*
    - *Recomendações Gerais*

- **Visão de uma empresa de qualquer área sobre o indivíduo**:
    - *Alinhamento com o Mercado*
    - *Pontos Focais para Entrevista*
    - *Posições Sugeridas*
    - *Potencial a Longo Prazo*
    - *Visão de Contratação Negativa*
    - *Visão de Contratação Positiva*
      
<hr>

### Como é a estrutura do projeto?

#### FrontEnd:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

- **React** + **Vite** para criar a interface SPA *(Single Page Aplication)* e torná-la dinâmica. <br>
- **Talwind CSS** para estilizar o conteúdo.
-  **NodeJS** para rodar o servidor FrontEnd.

#### BackEnd + API Restful:
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![LangChain](https://img.shields.io/badge/-LangChain-000000?style=flat-square&logo=langchain&logoColor=white)

- **Google Gemini** processa o currículo e cria os insights. <br>
- **Flask** atua como API entre o FrontEnd e o BackEnd, movimentando os dados.
- **LangChain** Orquestra o Modelo LLM *(Google Gemini)* para criar a solução inteligente.

<hr>

### Como utilizar?
Clone o repositório:
```
git clone https://github.com/Developer-Marcos/analisador-de-curriculos.git
```
<hr>

**Ativando o FrontEnd**:
 - Navegue até a pasta *frontend*:<br>
```
cd frontend
```

 - Instale as dependências do frontend:<br>
```
npm install
```

 - Inicie o servidor FrontEnd:
```
npm run dev
```
**Cole a URL (link) do local indicado no terminal para acessar o projeto.**
<hr>

**Ativando o BackEnd:**
 - Abra outro terminal e navegue até a pasta *backend*:<br>
```
cd backend
```

 - Instale as dependências do Python: <br>
```
pip install -r requirements.txt
```

- Crie o arquivo .env **dentro da pasta backend** e **adicione a sua API KEY** do Google Gemini:<br>    
``` python
GOOGLE_API_KEY = "sua_API_KEY"
```

 - Inicie o servidor da API *(execute o arquivo app.py)*:
```
python app.py
```

<hr>

Por fim, na página, selecione a área da empresa e carregue o currículo no campo indicado.<br>
Basta enviar e aguardar o processamento.<br>
###### O processamento pode demorar um pouco, pois o modelo de LLM é chamado 3 vezes para executar tarefas complexas e também depende da sua conexão com a internet.
