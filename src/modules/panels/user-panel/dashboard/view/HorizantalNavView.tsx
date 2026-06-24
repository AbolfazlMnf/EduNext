import { getUserInfo } from "@/core/services/api/Get/GetUserInfo";
import HorizontalNav from "../components/HorizontalNav";
import { getUser } from "@/core/services/api/Get/GetUser";

const HorizantalNavView = async () => {
  const user = await getUser();

  return (
    <div>
      <HorizontalNav user={user} />
    </div>
  );
};

export default HorizantalNavView;
