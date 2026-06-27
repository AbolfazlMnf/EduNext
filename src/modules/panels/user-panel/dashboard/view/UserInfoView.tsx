import { getUser } from "@/core/services/api/get/getUser";
import { UserInfo } from "../../user-info/UserInfo";

export const UserInfoView = async () => {
  const user = await getUser();
  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};
