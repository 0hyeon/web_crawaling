import { Switch, Group } from "@mantine/core";
import { SSG_PO_Channel } from "@prisma/client";
import { useEffect, useState } from "react";
const SwitchBtn = ({ media, channels }: { media: string; channels: any }) => {
  const [switches, setSwitches] = useState(channels);

  const handleChange = (id: number, currentOnOff: boolean) => {
    const updatedSwitches = switches.map((el: any) =>
      el.id === id ? { ...el, onOff: !currentOnOff } : el
    );
    setSwitches(updatedSwitches);
  };

  useEffect(() => {
    console.log("switches : ", switches);
  }, [switches]); // switches 상태가 변경될 때마다 useEffect 실행

  return (
    <Switch.Group
      defaultValue={["react"]}
      label={`${media}`}
      description="This is anonymus"
    >
      <Group mt="xs" className="flex">
        {channels.map((el: any) => (
          <Switch
            key={el.id}
            value={el.channel}
            label={el.channel}
            onChange={() => handleChange(el.id, el.onOff)}
          />
        ))}
      </Group>
    </Switch.Group>
  );
};

export default SwitchBtn;
