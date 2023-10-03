const LoadingComponent = () => {
  console.log('LoadingComponent 렌더링됨');
  return (
    <div className="loading">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
