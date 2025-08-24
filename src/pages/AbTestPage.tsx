import { useExperiment, useGateValue, useStatsigClient } from "@statsig/react-bindings";
import ConfettiButton from "../components/base/ConfettiButton";

export default function AbTestPage() {
  const { client } = useStatsigClient();
  const { value: enable_feature } = useExperiment("green-blue-button-ctr"); // statsig 사이트의 experiment id
  const showGreenButton = enable_feature;
  const showOrangeButton = useGateValue("new_button_color");

  const logClick = () => {
    client.logEvent("button_click", showGreenButton ? "green" : "blue");
    console.log("statsig logged:", "button_click", showGreenButton ? "green" : "blue");
  };

  return (
    <div>
      <div>
        <h2>A/B 테스트 w/ Statsig</h2>
        <h3>50% 확률로 green, 50% 확률로 blue 버튼이 보여집니다</h3>
        <div>
          <ConfettiButton color={showGreenButton ? "green" : "blue"} onClick={logClick} />
        </div>
      </div>
      <div>
        <h2>기능 플래그 w/ Statsig</h2>
        <h3>25% 확률로 새로운 UI를 표시하겠습니다</h3>
        <div>{showOrangeButton ? "25%의 사용자 🥳" : "75%의 사용자"}</div>
      </div>
    </div>
  );
}
