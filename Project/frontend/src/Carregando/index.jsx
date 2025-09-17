import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <span className="loading-text text-[#343434]">Processando</span>     
      <div className="dots-container">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
      </div>
      <span className="loading-text text-[#343434]/60 text-xs">Isso vai demorar um pouco</span>
    </div>
  );
};

export default Loading;