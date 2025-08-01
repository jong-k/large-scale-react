import { useExperiment, useStatsigClient } from "@statsig/react-bindings";
import ConfettiButton from "../components/base/ConfettiButton";

export default function AbTestPage() {
  const { client } = useStatsigClient();
  const { value } = useExperiment("green-blue-button-ctr"); // statsig 사이트의 experiment id
  const showGreenButton = value.enable_feature;

  const logClick = () => {
    client.logEvent("button_click", showGreenButton ? "green" : "blue");
    console.log(
      "statsig logged:",
      "button_click",
      showGreenButton ? "green" : "blue"
    );
  };

  return (
    <div>
      <h2>A/B 테스트 w/ Statsig</h2>
      <div>
        <ConfettiButton
          color={showGreenButton ? "green" : "blue"}
          onClick={logClick}
        />
      </div>
    </div>
  );
}
