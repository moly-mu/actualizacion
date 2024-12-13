const Notifications = () => {
    const notifications = [
      {
        company: "Nombre de la Empresa 1",
        status: "Rechazado",
        description: "Descripción del puesto 1",
        date: "29 oct",
      },
      {
        company: "Nombre de la Empresa 2",
        status: "Aceptado",
        description: "Descripción del puesto 2",
        date: "1 nov",
      },
    ];
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <p className="text-gray-600 text-sm mt-2">
          Aquí estarán las notificaciones de las ofertas a las que se postuló, si fue rechazado o aceptado para estas.
        </p>
        <table className="mt-4 w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Empresa</th>
              <th className="border-b py-2">Estatus</th>
              <th className="border-b py-2">Descripción</th>
              <th className="border-b py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2">{notification.company}</td>
                <td className={`py-2 ${notification.status === 'Aceptado' ? 'text-green-500' : 'text-red-500'}`}>{notification.status}</td>
                <td className="py-2">{notification.description}</td>
                <td className="py-2">{notification.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Notifications;
  