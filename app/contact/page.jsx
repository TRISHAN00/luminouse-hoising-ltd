import Contact from "@/components/contact/Contact";

export const metadata = {
    title: {
        default: "Contact | Dcastalia",
    },
    description: "Dcastalia is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function MyComponent() {


    return (
        <Contact/>
    );
};
