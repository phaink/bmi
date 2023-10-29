export default function Footer () {
    const year = new Date().getFullYear()
    return (<footer className="h-fit bg-slate-800 text-gray-200 p-3">

        <p className="fixed bottom-0 text-1xl text-center flex gap-2 justify-center">
            <span className="font-thin">All rights reserved &copy;</span>
            <span className="font-thin">{year}</span>
            <span className="text-emerald-500 font-bold">MDesign</span>
        </p>
       
    </footer>)
}