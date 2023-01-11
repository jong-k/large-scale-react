import React, { useState, useEffect } from "react";

const Car = () => {
  return <h2>Boom!!</h2>;
};

const Testing = () => {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    console.log(isFocus);
  }, [isFocus]);
  return (
    <div>
      <input
        type="text"
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      {isFocus && <Car />}
    </div>
  );
};

export default Testing;
