import HorizontalNav from "../components/HorizontalNav";
import { getUser } from "@/core/services/api/get/getUser";

const HorizantalNavView = async () => {
  const user = await getUser();

  return (
    <div>
      <HorizontalNav user={user} />
    </div>
  );
};

export default HorizantalNavView;
