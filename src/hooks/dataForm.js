import { useState } from "react";

const useForm = (initialValues) => {
  const [data, setData] = useState(initialValues);
  const handleChange = ({ target }) => {
    if (target.name === "rate" || target.name === "count") {
      setData({
        ...data,
        rating: { ...data.rating, [target.name]: Number(target.value) },
      });
    } else if (target.className === "asNum") {
      setData({ ...data, [target.name]: Number(target.value) });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };
  return { data, handleChange };
};

export default useForm;
