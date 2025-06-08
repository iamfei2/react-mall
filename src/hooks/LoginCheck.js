import { useEffect, useContext } from 'react';
import { App } from "antd";
import { ServiceContext } from '../contexts/ServiceContext';
import { useNavigate } from 'react-router-dom';

const useLoginCheck = () => {
  const { user: userService } = useContext(ServiceContext);
  const { message } = App.useApp(); 
  const navigate = useNavigate();

  useEffect(() => {
      try {
        const user = userService.getCurrentUser();
        if (!user) {
          message.open({
            type: "warning",
            content: "请先登录商场",
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("错误: ", error);
      }
  })
};

export default useLoginCheck;