const Enviar = ({ disabled }) => {
  const classeAtivo = "bg-[#6888B0] px-4 py-2 text-white rounded-lg shadow-md cursor-pointer transition-colors hover:bg-[#526a8d]";
  const classeDesativado = "bg-[#6888B0] px-4 py-2 text-white rounded-lg shadow-md cursor-not-allowed opacity-50";

  return (
    <button className={disabled ? classeDesativado : classeAtivo} type="submit" disabled={disabled}>
      Enviar
    </button>
  );
}

export default Enviar;