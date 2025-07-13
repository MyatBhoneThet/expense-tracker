import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    const getAmountStyles = () => {
        if (type === 'income') {
            return 'bg-green-100 text-green-600';
        } else if (type === 'expense') {
            return 'bg-red-100 text-red-600';
        }
        return '';
    };
    return (
        <div className="group relative flex items-center gap-4  mt-2 bg-white p-4 rounded-lg shadow-md border border-gray-200/50 hover:bg-gray-50 transition-shadow duration-300">
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-700 bg-gray-100 rounded-full drop-shadow-lg'>
                {icon ? (
                    <img src = {icon} alt={title} className="w-6 h-6" />
                ) : (
                    <LuUtensils />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className ='text-sm text-gray-600 font-meduim'>{title}</p>
                    <p className='text-xs text-gray-400 mt-1'>{date}</p>
                </div>

            <div className ="flex items-center gap-2">
                {!hideDeleteBtn && (
                    <button className ="text-gray-400 hover:text-red-500 opacit-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    onClick = {onDelete}>
                    <LuTrash2 size ={18} />
                    </button>
                )}

                <div 
                    className = {`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                >
                    <h6 className ="text-xs fontmdium">
                        {type === 'income' ? "+" : "-"}${amount}
                    </h6>
                    {type === 'income' ? <LuTrendingUp/> : <LuTrendingDown />}
                </div>
            </div>
            </div>
        </div>
    );
};
export default TransactionInfoCard;
