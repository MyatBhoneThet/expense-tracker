import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import { toast } from 'react-toastify'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/layouts/DeleteAlert'
import { useState, useEffect } from 'react'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'



const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get all expense details
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // validate checks
    if(!category.trim()) {
      toast.error("Category is required.");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "ERROR ADDING EXPENSE.", error.response?.data?.message || error.message);
    }
  };

   const deleteExpense = async (id) => {
      try{
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
        setOpenDeleteAlert({
          show: false,
          data: null,
        });
        toast.success("Expense deleted successfully.");
        fetchExpenseDetails();
      } catch (error) {
        console.error(
          "Something went wrong. Please try again.", error.response?.data?.message || error.message
        );
      }
    };
  
    // handle download expense details
    const handleDownloadExpenseDetails = async () => {
      try{
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
          {
            responseType: "blob",
          }
        );

        // create url for blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expense_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(
          "Error downloading expense details.", error);
          toast.error("Something went wrong. Please try again.");
      }
    };
  

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, [] );
  
  return (
    <DashboardLayout activeMenu ="Expense">
      <div className='my-5 mx-auto'>
        <div className = "grid grid-cols-1 gap-6">
          <div className ="">
            <ExpenseOverview
              transactions ={expenseData}
              onExpenseIncome ={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>

        <ExpenseList
          transactions = {expenseData}
          onDelete ={(id) => { 
            setOpenDeleteAlert({show: true, data: id,});
          }}
            onDownload ={handleDownloadExpenseDetails}
        />

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
          />
        </Modal>

         <Modal
          isOpen = {openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title = "Delete Expense"
        >
          <DeleteAlert
            content = "Are you sure you want to delete this expense?"
            onDelete = {() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>
  );
};

export default Expense;
