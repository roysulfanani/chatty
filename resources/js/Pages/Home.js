import React from "react";
import App from "@/Layouts/App";

export default function Home() {
    return <div className="px-6 py-4">Start chat now . . .</div>;
}

Home.layout = (page) => <App children={page} title="Chatty App" />;
