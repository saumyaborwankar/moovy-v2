import { useParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../../store/rtk-api/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setUserDetails } from "../../store/slice/userSlice";
import { message } from "antd";

export const VerifyEmail = () => {
  const { token, userId } = useParams();
  const { data, isSuccess, isError } = useVerifyEmailQuery({
    token: token!,
    userId: userId!,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserDetails(data.user));
    }
    if (isError) {
      message.error(
        "Verification failed. The link is broken or has expired. Please try requesting a link again"
      );
    }
  }, [isSuccess, isError]);
  return <></>;
};
