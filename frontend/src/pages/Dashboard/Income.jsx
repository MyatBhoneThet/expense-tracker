import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-toastify';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // validate checks
    if(!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if(!date) {
      toast.error("Date is required.");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Something went wrong. Please try again.", error.response?.data?.message || error.message);
    }
  };

  // Handle Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success("Income deleted successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Something went wrong. Please try again.", error.response?.data?.message || error.message
      );
    }
  };

  // handle download income details
  const handleDownloadIncomeDetails = async () => {
        try{
        const response = await axiosInstance.get(
          API_PATHS.INCOME.DOWNLOAD_INCOME,
          {
            responseType: "blob",
          }
        );

        // create url for blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "income_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading income details.", error);
          toast.error("Something went wrong. Please try again.");
      }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu ="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className ="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome ={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete = {(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload = {handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen = {openAddIncomeModal}
          onClose = {() => setOpenAddIncomeModal(false)}
          title = "Add Income"
        >
          <AddIncomeForm onAddIncome = {handleAddIncome} />
        </Modal>

        <Modal
          isOpen = {openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title = "Delete Income"
        >
          <DeleteAlert
            content = "Are you sure you want to delete this income?"
            onDelete = {() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
  
      </div>
    </DashboardLayout>
  );
};



export default Income;
