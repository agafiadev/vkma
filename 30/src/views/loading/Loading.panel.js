import { Panel, Placeholder, Progress } from "@vkontakte/vkui";
import { Icon28GhostSimleOutline } from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import bridge from "@vkontakte/vk-bridge";

export const LoadingPanel = ({ id, setActiveView }) => {
  const dispatch = useDispatch();
  const [loadingValue, setLoadingValue] = useState(0);

  useEffect(() => {
    const fetchVkData = async () => {
      const data = await bridge.send("VKWebAppGetUserInfo");
      dispatch({
        type: "user/setVkData",
        payload: data,
      });
      setLoadingValue(100);
      return;
    };
    const startGame = () => {
      setActiveView("homeView");
      return;
    };
    if (loadingValue == 0) {
      fetchVkData();
    }
    if (loadingValue == 100) {
      startGame();
    }
  }, [loadingValue]);

  return (
    <Panel id={id}>
      <Placeholder
        stretched
        icon={<Icon28GhostSimleOutline width={96} height={96} fill="#FF7D6B" />}
        header="SPYFALL"
      >
        <div className="loadingData">
          <span className="description">Инциализация игры</span>
          <Progress value={loadingValue} />
          <span className="progress">{loadingValue} %</span>
        </div>
      </Placeholder>
    </Panel>
  );
};
