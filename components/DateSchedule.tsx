import React, { useEffect, useRef, useState } from "react";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Calendar from "public/asset/svg/Calendar";
import { formatDate } from "@libs/client/FormData";
import useDetectClose from "@libs/client/useDetectClose";
function DateSchedule({
  getDate,
}: {
  getDate: (startDay: string | null, lastDay: string | null) => void;
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  // const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    // console.log("value  :", value);
    if (value[0] !== null || (value[0] === null && value[1] === null)) {
      getDate(formatDate(value[0]), formatDate(value[1]));
    }
  }, [getDate, value]);
  return (
    <div
      className="z-[999999] mr-5 flex cursor-pointer items-center justify-center border-b-2 bg-white "
      ref={dropDownRef}
    >
      {isOpen ? (
        <Group position="center">
          <Group position="center">
            <DatePicker
              className="absolute left-[-250px] top-10 rounded-lg bg-white p-[10px] drop-shadow-lg"
              type="range"
              // numberOfColumns={2}
              value={value}
              onChange={setValue}
            />
          </Group>
        </Group>
      ) : null}
      <div onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <Calendar width={30} height={30} fill={"#91979c"} />
      </div>
    </div>
  );
}

export default DateSchedule;
