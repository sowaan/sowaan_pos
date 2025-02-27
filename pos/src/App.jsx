import React, { Suspense, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useFrappeAuth, useFrappeGetCall } from "frappe-react-sdk";
import { useDispatch } from "react-redux";

import {
  setOpeningShift,
  setPosProfile,
} from "./redux/posdetails/posdetailSlice";

import Loader from "./components/Loader";
import ShiftDialog from "./components/ShiftDialog";

const SignIn = React.lazy(() => import("./pages/SignIn"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SubmitInvoice = React.lazy(() => import("./pages/SubmitInvoice"));

function App() {
  const dispatch = useDispatch();
  const { currentUser, isLoading: authLoading } = useFrappeAuth();

  // Fetch opening shift data ONLY IF `currentUser` exists
  const { data: openingShift, isLoading: shiftLoading } = useFrappeGetCall(
    currentUser ? "posawesome.posawesome.api.posapp.check_opening_shift" : null,
    currentUser ? { user: currentUser } : null
  );

  // Memoized values to avoid unnecessary re-renders
  const posProfile = useMemo(
    () => openingShift?.message?.pos_profile,
    [openingShift]
  );
  const posOpeningShift = useMemo(
    () => openingShift?.message?.pos_opening_shift,
    [openingShift]
  );

  useEffect(() => {
    if (posProfile) dispatch(setPosProfile(posProfile));
    if (posOpeningShift) dispatch(setOpeningShift(posOpeningShift));
  }, [posProfile, posOpeningShift, dispatch]);

  if (authLoading || (currentUser && shiftLoading)) {
    return <Loader message="Loading ..." />;
  }

  return (
    <div className="bg-gray-100">
      <ToastContainer position="bottom-center" />

      {currentUser && !openingShift?.message && <ShiftDialog />}

      <Suspense fallback={<Loader message="Loading ..." />}>
        <Routes>
          {!currentUser ? (
            <>
              <Route path="*" element={<Navigate to="/signin" replace />} />
              <Route path="/signin" element={<SignIn />} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<Navigate to="/" replace />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/submit-invoice" element={<SubmitInvoice />} />
              <Route path="*" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
