import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';


export default function CartItemSkeleton({ layout }) {
    return (
        layout === "desktop" ?
            <tr>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={80}></Skeleton></td>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={20}></Skeleton></td>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={20}></Skeleton></td>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={20}></Skeleton></td>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={20}></Skeleton></td>
                <td className="py-2 sm:py-3 px-2 sm:px-5 text-center"> <Skeleton height={30}></Skeleton></td>
            </tr>
            :

            <>
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-300">
                    <Skeleton width={64} height={64}></Skeleton>
                    <div className="flex-1 px-4">
                        <Skeleton height={15} width={100}></Skeleton>
                        <Skeleton height={15} width={50}></Skeleton>
                    </div>
                    <div className="flex flex-col items-end">
                        <Skeleton width={64} height={20}></Skeleton>
                        <Skeleton width={20} height={20}></Skeleton>
                    </div>
                </div>
            </>

    )
}
