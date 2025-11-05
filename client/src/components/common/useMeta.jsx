import React, { useEffect } from 'react'

export default function usePageTitle(pageTitle) {
   const appName = "BLOG APP";

   useEffect(()=> {
    if(pageTitle) {
        document.title = `${appName} | ${pageTitle}`;
    } else {
        document.title = appName
    }

   }, [pageTitle])
}