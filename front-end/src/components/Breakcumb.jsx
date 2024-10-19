import React from 'react';
import Link from 'next/link';

function Breakcumb({ parent, child, onHomeClick }) {

    if (parent) {
        return <>
        <div className='w-full py-10 px-20'>
            <nav className="flex items-center space-x-2">
                {/* Trang chủ */}
                <Link href="/" onClick={onHomeClick}>
                    <span className="text-blue-600 hover:underline">Trang chủ</span>
                </Link>
                {/* Hiển thị danh mục cha nếu có */}
                {parent && (
                    <>
                        <span className="mx-2 text-gray-500">{`>`}</span>
                        <span className="text-gray-500">{parent}</span>
                    </>
                )}
                {/* Hiển thị danh mục con nếu có */}
                {child && (
                    <>
                        <span className="mx-2 text-gray-500">{`>`}</span>
                        <span className="text-gray-500">{child}</span>
                    </>
                )}
            </nav>
        </div>
        </>
    }
}

export default Breakcumb;
