import ProfileDetails from "../Components/ProfileDetails.jsx";
import ProfileForm from "../Components/ProfileForm.jsx";
import OfferTablesController from "../Components/OfferTablesController.jsx";
import UserNotifications from "../Components/UserNotifications.jsx";

const ProfileContent = ({ currentView, user, isSidebarOpen }) => {



  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return (
          <ProfileDetails user={user} />

        );
      case "offers":
        return (

          <OfferTablesController offers={user?.offers || []} />

        );
      case "notifications":
        return (

          <UserNotifications />
        );
      case "resume":
        return (
          <ProfileForm />
        );
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div
      className={`flex-1 p-4 sm:p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-80" : "ml-16"
        }`}
    >
      {renderContent()}
    </div>
  );
};

export default ProfileContent;