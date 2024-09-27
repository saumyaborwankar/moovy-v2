// import { useEffect } from "react";
// import { useVerifyEmailQuery } from "@/app/redux/slice/userApi";
// import { setUserId } from "@/app/redux/slice/userSlice";
// import { message } from "antd";
// import { useParams } from "next/navigation";
// import { useDispatch } from "react-redux";

// export const VerifyEmail = () => {
//   const { token, userId } = useParams();
//   const { data, isSuccess, isError } = useVerifyEmailQuery({
//     token: token as string,
//     userId: userId as string,
//   });
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (isSuccess && data) {
//       dispatch(setUserId(data.user));
//     }
//     if (isError) {
//       message.error(
//         "Verification failed. The link is broken or has expired. Please try requesting a link again"
//       );
//     }
//   }, [isSuccess, isError]);
//   return <></>;
// };
