import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
  error: null,
};

const AccountSlice = createSlice({
  name: " account",
  initialState,
  reducers: {
    deposit(state, action) {
      // console.log(state);
      // console.log("difference");
      console.log(action.payload);
      state.balance += action.payload;
      state.isLoading = false;
      state.error = null;
    },
    withdraw(state, action) {
      console.log(state);
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export async function calculateDeposit(amount, currency) {
  if (currency === "USD") return amount;
  // dispatch({ type: "account/convertingCurrency" });
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    const convertedAmount = data.rates.USD * amount;
    return convertedAmount;
  } catch (error) {
    // handle error
  }
}

export const { deposit, withdraw, requestLoan, payLoan } = AccountSlice.actions;

export default AccountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//         error: null,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       // LATER
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     case "account/error":
//       return { ...state, isLoading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     try {
//       const res = await fetch(
//         `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//       );
//       if (!res.ok) throw new Error("Network response was not ok");
//       const data = await res.json();
//       const converted = data.rates.USD * amount;
//       dispatch({ type: "account/deposit", payload: converted });
//     } catch (error) {
//       dispatch({
//         type: "account/error",
//         payload: "Currency conversion failed",
//       });
//     }
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// export function payLoan() {
//   // Corrected function name and removed parameter
//   return { type: "account/payLoan" }; // Corrected action type here
// }
