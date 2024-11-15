"use client";
import Head from "next/head";
import React from "react";

function PageTitle({ children, title }) {
  return (
    <>
      {/* <html>
				<head>
					<title>{title}</title>
				</head>

			</html> */}
      {children}
    </>
  );
}

export default PageTitle;
