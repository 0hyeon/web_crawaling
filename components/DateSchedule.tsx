import React, { useEffect, useRef, useState } from "react";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import useDetectClose from "@libs/client/useDetectClose";
import Calendar from "public/asset/svg/Calendar";
import { formatDate } from "@libs/client/FormData";
function DateSchedule() {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    if (value[0] !== null) {
      formatDate(value[0]);
      console.log(formatDate(value[0]), formatDate(value[1]));
    } else {
      if (value[1] !== null) {
        formatDate(value[1]);
      }
    }
  }, [value]);
  return (
    <div
      className="absolute left-[-50px] z-[1] mr-5 flex items-center justify-center border-b-2 bg-white"
      ref={dropDownRef as any}
    >
      {isOpen ? (
        <Group position="center">
          <Group position="center">
            <DatePicker
              className="absolute left-[-500px] top-10 bg-white"
              type="range"
              numberOfColumns={2}
              value={value}
              onChange={setValue}
            />
          </Group>
        </Group>
      ) : null}
      <div onClick={() => setIsOpen((prev: any) => !prev) as any}>
        <Calendar width={30} height={30} fill={"#91979c"} />
      </div>
    </div>
  );
}

export default DateSchedule;
