import Main from "@/components/Pages/Main";
import Banks from "@/components/Pages/Banks";
import Terms from "@/components/Pages/Terms";
import Videos from "@/components/Pages/Videos";
import Issuers from "@/components/Pages/Issuers";
import Error404 from "@/components/Pages/Error404";

export default [
    {
        path: "",
        name: "main",
        component: Main,
    },
    {
        path: "/terms",
        name: "terms",
        component: Terms,
    },
    {
        path: "/videos",
        name: "videos",
        component: Videos,
    },
    {
        path: "/issuers",
        name: "issuers",
        component: Issuers,
    },
    {
        path: "/banks",
        name: 'banks',
        component: Banks,
    },
    {
        path: '/404',
        name: '404',
        component: Error404,
    },
    {
        path: '*',
        redirect: '/404'
    }
];