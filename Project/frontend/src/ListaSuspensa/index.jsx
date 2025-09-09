const ListaSuspensa = ({aoAlterar, valor}) => {
  const areasDeEmpresas = [
    "Agronegócio",
    "Alimentício",
    "Automotivo",
    "Aeronáutico e Espacial",
    "Arquitetura e Urbanismo",
    "Artes, Cultura e Entretenimento",
    "Atacado e Varejo",
    "Biotecnologia",
    "Bens de Consumo",
    "Construção Civil",
    "Consultoria",
    "Defesa e Segurança",
    "Design e Moda",
    "Educação",
    "Eletrônicos",
    "Energia Elétrica",
    "Energia Renovável",
    "Engenharia",
    "Esporte e Lazer",
    "Farmacêutico",
    "Financeiro",
    "Games e E-sports",
    "Governamental",
    "Imobiliário",
    "Indústria Química",
    "Indústria Metalúrgica",
    "Indústria Plástica",
    "Jurídico",
    "Logística e Transporte",
    "Marketing e Publicidade",
    "Mídia e Comunicação",
    "Mineração",
    "ONGs e Terceiro Setor",
    "Óleo e Gás",
    "Papel e Celulose",
    "Petróleo e Derivados",
    "Recursos Humanos",
    "Saúde e Bem-estar",
    "Seguros",
    "Serviços Domésticos",
    "Serviços Digitais",
    "Startups",
    "Sustentabilidade e Meio Ambiente",
    "Tecnologia da Informação",
    "Telecomunicações",
    "Turismo e Hotelaria"
  ];

  return (
        <div>
            <label>Área da empresa: </label>

            <select required value={valor} onChange={e => aoAlterar(e.target.value)}>
                <option value="" disabled>
                    Selecione onde a empresa atua
                </option>
                
                {areasDeEmpresas.map((area, index) => (
                    <option key={index} value={area}>
                        {area}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ListaSuspensa;
