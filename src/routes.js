import Main from "@/components/Pages/Main";
import Banks from "@/components/Pages/Banks";
import Terms from "@/components/Pages/Terms";
import Videos from "@/components/Pages/Videos";
import Etf from "@/components/Pages/Etf";
import Issuers from "@/components/Pages/Issuers";
import Error404 from "@/components/Pages/Error404";
import Book from "@/components/Pages/Book";
import Cases from "@/components/Pages/Cases";
import Hook from "@/components/Pages/Hook";
import Services from "@/components/Pages/Services";

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
        path: "/etf",
        name: "etf",
        component: Etf,
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
        path: '/book',
        name: 'book',
        component: Book,
    },
    {
        path: '/cases',
        name: 'cases',
        component: Cases,
    },
    {
        path: '/hook',
        name: 'hook',
        component: Hook,
    },
    {
        path: '/services',
        name: 'services',
        component: Services,
    },
    {
        path: '*',
        redirect: '/404'
    }
];