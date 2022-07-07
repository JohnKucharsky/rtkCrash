import { MDBModal, MDBModalContent } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    count === 0 && navigate("/auth");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="vh-100 ">
      <MDBModal show={true}>
        <MDBModalContent>
          <p className="mt-3">Redirecting you in {count}</p>
        </MDBModalContent>
      </MDBModal>
    </div>
  );
};

export default LoadingToRedirect;
