import { FaEdit, FaTrash } from "react-icons/fa";

export function PostCategoryManager() {
    // const handleEditClick = (product: Product) => {
    //     console.log('product: ===> ', product);
    //     setEditingProduct(product);
    //     setShowEditPopup(true);
    //     setImagePreview(product.image);
    // };
    // const handleDeleteClick = (id: string) => {
    //     console.log('productDeleteId: ', productDeleteId);
    //     setProductDeleteId(id);
    //     setShowConfirmPopup(true);
    // };
    return (
        <div className="px-20">
            <h1 className="font-bold text-3xl">Danh mục bài viết</h1>
            <div className="mt-4">
                <table className="w-full">
                    <thead className="">
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Danh mục</th>
                        <th>Thời gian tạo</th>
                        <th>Hành động</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>21312</td>
                            <td>csadca</td>
                            <td>csadca</td>
                            <td>csadca</td>
                            <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                                <button
                                // onClick={() => handleDeleteClick(product._id!)}
                                className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                >
                                    <FaTrash className="mr-1" /> Xóa
                                </button>
                                <button
                                    // onClick={() => handleEditClick(product)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                >
                                    <FaEdit className="mr-1" /> Sửa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}