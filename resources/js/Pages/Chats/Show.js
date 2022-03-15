import App from "@/Layouts/App";
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";

const sts = (x, y, option = "justify") => {
    if (option == "justify") {
        return x === y ? "justify-end" : "justify-start";
    }
    if (option == "background") {
        return x === y
            ? "bg-green-100 text-green-900"
            : "bg-gray-100 text-gray-900";
    }
    // if (x === y) {
    //     ${
    //         x === y
    //             ? "justify-end"
    //             : "justify-start"
    //     }
    // }
};

export default function Show(props) {
    const { auth } = usePage().props;
    const { user, chats } = props;
    const { data, setData, reset, errors, post } = useForm({ message: "" });

    const submitHandler = (event) => {
        event.preventDefault();
        post(route("chats.store", user.username), {
            onSuccess: () => {
                reset("message");
            },
        });
    };

    Echo.channel("chats").listen("MessageSent", ({ chat }) => {
        Inertia.reload({ preserveScroll: true });
    });

    return (
        <div>
            <Head title={`Chat with ${user.name}`} />
            <div className="flex flex-col justify-between h-screen">
                <div className="border-b p-4">
                    <h1 className="font-semibold">{user.name}</h1>
                </div>
                <div className="px-4 py-2 flex-1 overflow-auto space-y-2">
                    {chats.length ? (
                        chats.map((chat) => (
                            <div
                                className={`flex text-sm ${sts(
                                    auth.user.id,
                                    chat.sender_id
                                )}`}
                                key={chat.id}
                            >
                                <div
                                    className={`p-4 rounded-xl ${sts(
                                        auth.user.id,
                                        chat.sender_id,
                                        "background"
                                    )}`}
                                >
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">
                            Start chat with someone . . .
                        </div>
                    )}
                </div>
                <div className="border-t px-4 py-2">
                    <form onSubmit={submitHandler}>
                        <input
                            value={data.message}
                            autoComplete={"off"}
                            onChange={(event) =>
                                setData({
                                    ...data,
                                    message: event.target.value,
                                })
                            }
                            placeholder="Start typing . . ."
                            type="text"
                            name="message"
                            id="message"
                            className="form-text focus:outline-none focus:border-0 focus:ring-0 border-0 w-full p-0"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} />;
