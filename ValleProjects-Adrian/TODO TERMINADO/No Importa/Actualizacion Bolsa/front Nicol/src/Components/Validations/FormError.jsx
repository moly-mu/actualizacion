const FormError = ({ message }) => {
    return (
      <div className="text-red-500 text-sm mt-2">
        <i className="fas fa-exclamation-circle"></i> {message}
      </div>
    );
  };
  
  export default FormError;
  