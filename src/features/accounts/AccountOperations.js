import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./AccountSlice";
import { calculateDeposit } from "./AccountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
    error,
  } = useSelector((store) => store.account);

  async function handleDeposit() {
    const amount = Number(depositAmount);
    if (!amount) return;
    const amountToDeposit = await calculateDeposit(amount, currency);
    dispatch(deposit(amountToDeposit));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    const amount = Number(withdrawAmount);
    if (!amount) return;
    console.log(withdraw(amount));

    dispatch(withdraw(amount));
    setWithdrawAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    const amount = Number(loanAmount);
    dispatch(requestLoan(amount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div className="pl-5">
      <h2 className="font-bold text-2xl mb-3">Your Account Operations</h2>
      <div className="flex flex-col gap-3 p-8  w-[700px] bg-slate-300 border">
        <div>
          <label className="mr-2" htmlFor="deposit">
            Deposit
          </label>
          <input
            type="number"
            value={depositAmount}
            className="border border-black"
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mr-2 border h-9 border-black"
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          <button
            className="border w-[9rem] h-8 text-white bg-black border-black"
            onClick={handleDeposit}
            disabled={isLoading}
          >
            {isLoading ? "Converting" : ` Deposit ${depositAmount}`}
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <div>
          <label className="mr-2">Withdraw</label>
          <input
            type="number"
            value={withdrawAmount}
            className="mr-2 border h-9 border-black"
            onChange={(e) => setWithdrawAmount(+e.target.value)}
          />
          <button
            className="border w-[9rem] h-8 text-white bg-black border-black"
            onClick={handleWithdrawal}
          >
            Withdraw {withdrawAmount}
          </button>
        </div>

        <div>
          <label className="mr-2" htmlFor="loan">
            Request Loan
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan Amount"
            className="mr-2 border text-center h-9 border-black"
          />
          <input
            type="text"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan Purpose"
            className="mr-2 border text-center border-black h-9"
          />
          <button
            className="border w-[9rem] h-8 text-white bg-black border-black"
            onClick={handleRequestLoan}
          >
            {" "}
            Request Loan
          </button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span className="mr-2">
              Pay Back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button
              className="border w-[9rem] h-8 text-white bg-black border-black"
              onClick={handlePayLoan}
            >
              Pay Loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
