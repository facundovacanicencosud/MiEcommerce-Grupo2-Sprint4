import { useState } from "react";

const usePutForm = (initialValues) => {
  const [data, setData] = useState(initialValues);
  const handleChange = ({ target }) => {
    if (target.classList[1]) {
      setData({ ...data, [target.name]: Number(target.value) });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };
  return { data, handleChange };
};

export default usePutForm;
