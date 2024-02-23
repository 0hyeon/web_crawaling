import { Switch, Group } from "@mantine/core";
import { SSG_PO_Channel } from "@prisma/client";
import { useEffect, useState } from "react";
const SwitchBtn = ({ el }: { el: any }) => {
  // const [switches, setSwitches] = useState(channels);
  const [checked, setChecked] = useState(true);

  // const handleChange = (id: number, currentOnOff: boolean) => {
  //   console.log(id, currentOnOff);
  //   const updatedSwitches = switches.map((el: any) =>
  //     el.id === id ? { ...el, onOff: !currentOnOff } : el
  //   );
  //   setSwitches(updatedSwitches);
  // };
  console.log(el);
  return (
    <>
      <Switch
        defaultChecked={true}
        checked={true}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        key={el.id}
        value={el.channel}
        label={el.channel}
        // onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </>

    // <Switch.Group
    //   defaultValue={["react"]}
    //   label={`${media}`}
    //   description="This is anonymus"
    //   value={value}
    //   onChange={setValue}
    // >
    // <Group mt="xs" className="flex">
    //   {elements.map(
    //     (el: any) => el.channel
    //     // <Switch
    //     //   checked={checked}
    //     //   onChange={(event) => setChecked(event.currentTarget.checked)}
    //     //   key={el.id}
    //     //   value={el.channel}
    //     //   label={el.channel}
    //     //   // checked={el.onOff}
    //     //   // onChange={(event) => setChecked(event.currentTarget.checked)}
    //     // />
    //   )}
    // </Group>
    // </Switch.Group>
  );
};

export default SwitchBtn;
