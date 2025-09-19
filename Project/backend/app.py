from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from LangChain_processing.helpers import extrair_dados
from LangChain_processing.LLM_service import analisar_curriculo, sugerir_melhorias, mostrar_visao_empresa
import os

app = Flask(__name__)
CORS(app)

PASTADEARQUIVO = 'arquivos_temporarios'
if not os.path.exists(PASTADEARQUIVO):
    os.makedirs(PASTADEARQUIVO)

@app.route('/api/processar', methods=['POST'])
def processar_curriculo():
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400
    
    curriculo = request.files['file']
    area_empresa = request.form.get('stringData')

    if curriculo.filename == '':
        return jsonify({"error": "Nome do arquivo não pode ser vazio"}), 400

    nome_seguro = secure_filename(curriculo.filename)
    caminho_temporario = os.path.join(PASTADEARQUIVO, nome_seguro) 

    try:
        curriculo.save(caminho_temporario)
        dados_curriculo = extrair_dados(caminho_temporario)
        
        analise_completa = analisar_curriculo(dados_curriculo)
        melhorias_sugeridas = sugerir_melhorias(curriculo=dados_curriculo, analise_curriculo=analise_completa)
        visao_da_empresa = mostrar_visao_empresa(curriculo=dados_curriculo, analise_curriculo=analise_completa, area_da_empresa=area_empresa)
    
        return jsonify({ 
            "areaDaEmpresa": area_empresa, 
            "analise_completa": analise_completa,
            "melhorias_sugeridas": melhorias_sugeridas,
            "visao_da_empresa": visao_da_empresa
        }), 200

    except Exception as e:
        return jsonify({"error": f"Erro no processamento: {str(e)}"}), 500

    finally:
        if os.path.exists(caminho_temporario):
            os.remove(caminho_temporario)

if __name__ == '__main__':
    app.run(debug=True, port=5000)