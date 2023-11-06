// import React, { useState } from 'react';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { Calendar } from 'react-date-range';
// import { useAppDispatch } from '../../redux/store';
// import type { TodoID } from './types';

// const ReactDateRange = (): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const [time, setTime] = useState<Date>();
//   const handleSelect = (date) => {
//     // console.log(date);
//     alert(date);
//   };

//   const onHandleTime = async (id: TodoID): Promise<void> => {
//     const res = await fetch(`/api/time/${id}`, {
//       method: 'put',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ isData: time }),
//     });
//     const data: { message: string } = await res.json();
//     if (data.message === 'success') {
//       dispatch({ type: 'todos/time', payload: id });
//     }
//   };
//   const handleTime = (time: string): void => {
//     setTime(time);
//     // alert(time);
//     console.log(time);
//   //   };
//   return (
//     <div>
//       <h2>Your Date Challenge</h2>
//       <Calendar time={new Date()} onChange={handleTime} />
//       {/* {console.log(time)} */}
//     </div>
//   );
// };

// export default ReactDateRange;

// import React, { useState } from "react";
// import DateFnsUtils from "@date-io/date-fns"; // choose your lib
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";

// const ReactDateRange = () => {
//   const [selectedDate, handleDateChange] = useState(new Date());

//   const dateChangeValue = (date) => {
//     handleDateChange(date);
//     const dateValue = date;
//     console.log(dateValue);
//     alert(dateValue);
//   };

//   return (
//     <div>
//       <h2>Material UI Pickers</h2>
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DatePicker
//           variant="static"
//           value={selectedDate}
//           onChange={dateChangeValue}
//         />
//         {/\* <br /> \*/}
//         <TimePicker value={selectedDate} onChange={dateChangeValue} />
//         <DateTimePicker value={selectedDate} onChange={dateChangeValue} />
//       </MuiPickersUtilsProvider>
//     </div>
//   );
// };

// export default ReactDateRange;
