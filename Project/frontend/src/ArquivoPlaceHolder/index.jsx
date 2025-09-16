import React, { useRef, useState } from 'react';

const ArquivoPlaceHolder = ({ aoAlterar }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  // 1. Novo estado para armazenar o nome do arquivo selecionado
  const [fileName, setFileName] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (file) => {
    if (file) {
      // 2. Atualiza o estado com o nome do arquivo
      setFileName(file.name);
      aoAlterar(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 border-2 border-dashed
        rounded-lg shadow-inner bg-white
        ${isDragging ? 'border-blue-500' : 'border-gray-300'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files[0])}
        className="hidden" 
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-[#6888B0] text-white py-3 px-6 rounded-lg shadow-md cursor-pointer"
      >
        {/* 3. Exibição condicional: mostra o nome do arquivo ou o texto padrão */}
        {fileName ? fileName : 'Selecionar arquivo PDF, DOCX ou TXT'}
      </button>

      <p className="text-sm text-gray-500 mt-2">
        ou arraste ele até aqui
      </p>
    </div>
  );
};

export default ArquivoPlaceHolder;