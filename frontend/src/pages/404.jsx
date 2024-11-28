import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isDynamicRoute } from "next/dist/shared/lib/router/utils";
import { getRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import { useAppProvider } from "../contexts/AppProvider";
import NotFound from "../components/NotFound";


async function pageExists(location) {
    const { sortedPages } = await getClientBuildManifest();

    const pathname = location === "/" ? location : location.replace(/\/$/, "");

    return (
        sortedPages.includes(pathname) ||
        sortedPages.some((page) => {
            return (
                isDynamicRoute(page) && getRouteRegex(page).re.test(pathname)
            );
        })
    );
}

const Custom404 = () => {
    const router = useRouter();

    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            pageExists(router.asPath).then((exists) => {
                if (!exists) {
                    setIsNotFound(true);
                } else router.replace(router.asPath);
            });
        }
    }, [router.isReady, router.asPath, router]);


    if (!isNotFound) return (
        <div className='w-[100vw] h-[100vh] bg-white fixed top-0 left-0 right-0 z-[100000] flex items-center justify-center'>
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
            <p className="text-blue-500 text-lg font-semibold ml-4">Đang tải...</p>
        </div>
    );

    return (
        <NotFound />
    )
};

export default Custom404;