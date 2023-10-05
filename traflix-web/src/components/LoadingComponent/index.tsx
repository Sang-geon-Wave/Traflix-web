const LoadingComponent = () => {
  return (
    <div className="loading flex d-flex align-items-center justify-content-center h-100">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
