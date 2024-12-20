import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Subscription = () => {
  const userInfo = useSelector((state) => state?.userInfo?.userInfo);
  const [loading, setLoading] = useState(false);
  const subscriptionError = useSelector(
    (state) => state?.subscription?.subscriptionError
  );

  const [timeDifference, setTimeDifference] = useState(null);
  let expiredDate;
  let startDate;

  if (userInfo?.subscription) {
    expiredDate = new Date(userInfo?.subscription?.expiredDate);
    startDate = new Date(userInfo?.subscription?.startDate);
  }

  useEffect(() => {
    if (startDate && expiredDate) {
      const timeDiff = expiredDate - startDate;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      setTimeDifference(days);
    }
  }, [startDate, expiredDate]);

  // useEffect(() => {
  //   if (userInfo?.subscription && ) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [userInfo]);

  return (
    <div>
      {loading ? (
        <div className="text-center">loading</div>
      ) : (
        <div>
          {subscriptionError ? (
            <p className="text-center">
              {subscriptionError} ,To upgrade, please get in touch with
              <a
                href="mailto:premium@betaSquad.io"
                className="underline  ml-1 "
              >
                premium@betaSquad.io
              </a>
            </p>
          ) : (
            <p className="text-center">
              Your subscription has expired. To upgrade, please get in touch
              with{" "}
              <a href="mailto:premium@betaSquad.io" className="underline ml-1">
                premium@betaSquad.io
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscription;
