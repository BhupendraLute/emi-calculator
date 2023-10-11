import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import TextInput from "./Components/textInput";
import SliderInput from "./Components/sliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, fee, tenure]);

  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEmi(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  const calculateEmi = (downPayment) => {
    // EMI amount = [P X R X (1+R^N)/[(1+P)^N-1]]

    if (!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;

    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const totalDownPayment = () => {
    const value =
      Number(downPayment) + (cost - downPayment) * (fee / 100).toFixed(0);

    return value;
  };

  const totalLoanAmount = () => {
    const result = cost > 0 ? Number(emi * tenure).toFixed(0) : 0;
    return result;
  };

  return (
    <div className="App">
      <span
        className="title"
        style={{
          display: "block",
          textAlign: "center",
          fontSize: 25,
          marginTop: 10,
        }}
      >
        EMI Calculator
      </span>

      <div className="feature">
        <TextInput
          title={"Total Cost of Assets"}
          state={cost}
          setState={setCost}
          max={99999999999999}
        />
      </div>

      <div className="feature">
        <TextInput
          title={"Interest Rate (in %)"}
          state={interest}
          setState={setInterest}
        />
      </div>

      <div className="feature">
        <TextInput
          title={"Processing Fee (in %)"}
          state={fee}
          setState={setFee}
        />
      </div>

      <div className="feature">
        <SliderInput
          title={"Down Payment"}
          underlineTitle={`Total Down Payment - ₹ ${totalDownPayment()}`}
          onChange={updateEmi}
          state={downPayment}
          min={0}
          max={cost}
          labelMin={"0%"}
          labelMax={"100%"}
        />
      </div>

      <div className="feature">
        <SliderInput
          title={"Loan Per Month"}
          underlineTitle={`Total Loan Amount - ₹ ${totalLoanAmount()}`}
          onChange={updateDownPayment}
          state={emi}
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          labelMin={0}
          labelMax={calculateEmi(0)? calculateEmi(0) : 0}
        />
      </div>

      <div className="feature">
        <span className="title">Tenure</span>
        <div className="tenureContainer">
          {tenureData.map((t) => {
            return (
              <button
                key={t}
                className={`tenure ${t === tenure ? "selected" : ""}`}
                onClick={() => setTenure(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
