import { useForm } from "react-hook-form";
import { ILoginForm } from "../interface/login";
import { authInstance } from "@/libs/axios";
import { IApiResponse } from "@/shared/interfaces/api-response";
import { useRouter } from "next/navigation";
import { IAuthLoginResponse } from "@/shared/interfaces/auth-response";

export const useLogin = () => {
  const router = useRouter();
  const form = useForm<ILoginForm>();

  const handleLogin = async (data: ILoginForm) => {
    try {
      const resp = await authInstance.post<IApiResponse<IAuthLoginResponse>>(
        "/login",
        data
      );
      if (resp.data.success && resp.data.data?.token) {
        document.cookie = `jabes-authorization=${resp.data.data.token}; path=/`;
        return router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    handleLogin,
  };
};
