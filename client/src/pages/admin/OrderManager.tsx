import { FaEdit, FaTrash } from "react-icons/fa";
import { TGetAllOrder } from "~/interfaces/types/order";
import { useGetOrdersQuery } from "~/services/order/order.service";

export function OrderManager() {
    
    const {data: orderDatas, isLoading} = useGetOrdersQuery();

    console.log('orderDatas: ', orderDatas);
    console.log('isLoading: ', isLoading);
    const formatPrice = (num: number) => {
        return num.toLocaleString('vi-VN');
    };
    return (
        <div className="p-20">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Đơn hàng</h1>
                </div>
                <div>
                    <select name="" id="">
                        <option value="">Đang chờ</option>
                        <option value="">Đã giao</option>
                    </select>
                    <select name="" id="">
                        <option value="">Chưa thanh toán</option>
                        <option value="">Đã thanh toán</option>
                    </select>
                </div>
            </div>
            <div className="mt-4">
                 {isLoading ? (
                    <div className="text-center text-gray-500">Đang tải...</div>
                ) : (
                    <>
                        {!orderDatas?.data?.length ? (
                            <div className="col-span-full text-center text-gray-500">
                                Không có danh mục nào!
                            </div>
                        ) : (
                            <>
                                <table className="w-full">
                                    <thead className="">
                                        <th>ID</th>
                                        <th>Tên khách hàng</th>
                                        <th>Trạng thái</th>
                                        <th>Tổng tiền</th>
                                        <th>Thanh toán</th>
                                        <th>Thời gian đặt</th>
                                        <th>Hành động</th>
                                    </thead>
                                    <tbody>
                                        {orderDatas?.data?.map((order: TGetAllOrder) => (
                                        <tr>
                                            <td className="text-center">{order.code}</td>
                                            <td className="text-center">{order.customer.full_name ?? "None"}</td>
                                            <td className="text-center">{order.order_status}</td>
                                            <td className="text-center">{formatPrice(order.final_total)} đ</td>
                                            <td className="text-center">{order.is_payment ? "đã thanh toán" : "chưa thanh toán"}</td>
                                            <td className="text-center">{new Date(order.created_at!).toLocaleString('vi-VN')}</td>
                                            <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                                                <button
                                                // onClick={() => handleDeleteClick(product._id!)}
                                                className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                                >
                                                    <FaTrash className="mr-1" /> Xem
                                                </button>
                                               
                                                <button
                                                    // onClick={() => handleEditClick(product)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                                >
                                                    <FaEdit className="mr-1" /> Sửa
                                                </button>
                                                <button
                                                // onClick={() => handleDeleteClick(product._id!)}
                                                className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                                >
                                                    <FaTrash className="mr-1" /> Hủy
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}